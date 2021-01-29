const { date, func } = require('joi');
const db = require('../../config/mysql2/db');
const komputerSchema = require('../../model/joi/Komputer');


function checkRequired(value) {
    let err = {
        details: [{
            path: ['data_Stworzenia'],
            message: 'Pole jest wymagane.'
        }]
    };

    if (!value) {
        return err;
    }
    value = value.toString().trim();
    if (value === "") {
        return err;
    }
    return {};
}
function checkDate(value) {

    let err = {
        details: [{
            path: ['data_Stworzenia'],
            message: 'Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-24)'
        }]
    };
    if (!value) {
        return {};
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (pattern.test(value)) return {};
    return err;
}
function checkDateIfAfter(value, compareTo) {

    let err = {
        details: [{
            path: ['data_Stworzenia'],
            message: 'Podana data stworzenia jest z przyszłości, co nie jest możliwo.'
        }]
    };

    if (!value) {
        return err;
    }

    if (!compareTo) {
        return err;
    }
    const valueDate = new Date(value);
    // valueDate = valueDate.setDate(value);
    const compareToDate = new Date(compareTo);
    // compareToDate = compareToDate.setDate(compareTo);
    if (compareToDate.getTime() <= valueDate.getTime()) { // Верно ли сравнивает? Мб сравнивает часы в сутках ( от 0 до 23 )
        return err;
    }
    return {};
}

function createTommorowDate() {
    let tommorowDate = new Date();
    tommorowDate.setDate(tommorowDate.getDate() + 1);
    return tommorowDate;
}
function convertDateIntoStringLikeInView(date) {
    if (!(typeof date.getMonth === 'function')) return date;

    let dateAsString = date.toISOString().split('T')[0];
    return dateAsString;
}


function validateDate(updateData_Stworzenia) {
    let tommorowDate = convertDateIntoStringLikeInView(createTommorowDate());

    let errorDate = checkRequired(updateData_Stworzenia);
    /*
        console.log("checkRequired");
        console.log(errorDate);
        */
    if (!errorDate.hasOwnProperty('details')) {
        errorDate = checkDate(updateData_Stworzenia);
        /*
          console.log("checkDate");
          console.log(errorDate);
          */
    }
    if (!errorDate.hasOwnProperty('details')) {
        //  DOWN
        let normalizationDataStworzeniaInput = new Date(dataStworzeniaInput.value);
        normalizationDataStworzeniaInput.setDate(normalizationDataStworzeniaInput.getDate() + 1);
        /*
        console.log("Normalization date");
        console.log(normalizationDataStworzeniaInput);
        console.log("NormalizationDate\nDate:");
        console.log(normalizationDataStworzeniaInput);
        console.log("dataStworzeniaInput\nBEFORE:");
        console.log(dataStworzeniaInput.value);
*/
        dataStworzeniaInput.value = convertDateIntoStringLikeInView(normalizationDataStworzeniaInput);
        /*
              console.log("dataStworzeniaInput\nAFTER:");
              console.log(dataStworzeniaInput.value);
              */
        //  UP

        let nowDate = new Date();
        let tommorowDate = new Date();
        tommorowDate.setDate(nowDate.getDate() + 1);

        let month = '' + (tommorowDate.getMonth() + 1),
            day = '' + tommorowDate.getDate(),
            year = tommorowDate.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        const tommorowString = [year, month, day].join('-');

        errorDate = checkDateIfAfter(dataStworzeniaInput.value, tommorowString);  // if === {}
    }
    return errorDate;

}
exports.getKomputers = () => {
    return db.promise().query('SELECT * FROM Komputer')
        .then((results, fields) => {
            // console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getKomputerById = (computerId) => {
    const query = ` 
    SELECT komp._id as komp_id, 
    komp.model,
    komp.zaintstalowany_System_Operacyjny,
    komp.data_Stworzenia,
    komp.typ_Komputera,
    e._id as element_id, e.nazwa, e.opis, e.foto_path,
    z_e_k._id as z_e_k_id,
    z_e_k.aktuakna_Temperatura, 
    z_e_k.procent_Wykorzystanych_Zasobow, 
    z_e_k.aktualna_Szybkosc_Przekazania_Danych,
    z_e_k.typPolaczenia
FROM Komputer komp  
left join Zestaw_Elementow_Komputera z_e_k on z_e_k.computer_id = komp._id
left join Element_komputera e on z_e_k.element_id = e._id
where komp._id = ?`;
    return db.promise().query(query, [computerId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const computer = {
                _id: parseInt(computerId),
                model: firstRow.model,
                zaintstalowany_System_Operacyjny: firstRow.zaintstalowany_System_Operacyjny,
                typ_Komputera: firstRow.typ_Komputera,
                data_Stworzenia: firstRow.data_Stworzenia,
                zestaw_elementow_komputera: []
            };
            /*
            console.log("firstRow.komp_id");
            console.log(firstRow.komp_id);
            console.log("First row in getKOmputerById");
            console.log(firstRow);
            */
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.z_e_k_id) {
                    const zestaw_elementa_komputera = {
                        _id: row.z_e_k_id,
                        aktuakna_Temperatura: row.aktuakna_Temperatura,
                        procent_Wykorzystanych_Zasobow: row.procent_Wykorzystanych_Zasobow,
                        aktualna_Szybkosc_Przekazania_Danych: row.aktualna_Szybkosc_Przekazania_Danych,
                        typPolaczenia: row.typPolaczenia,
                        element_komputera: {
                            _id: row.element_id,//firstRow.element_id,//komp_id, // firstRow._id, 
                            nazwa: row.nazwa,
                            opis: row.opis,
                            foto_path: row.foto_Path // Изменил с foto_path на foto_Path
                        }
                    };
                    computer.zestaw_elementow_komputera.push(zestaw_elementa_komputera);
                }
            }
            return computer;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createKomputer = (newKomputerData) => {


    const validationResult = komputerSchema.validate(newKomputerData, { abortEarly: false });
    let dataError = validateDate(newKomputerData.data_Stworzenia);
    // Лишь на мгновение 
    if (validationResult.error) {
        /*
        console.log("validationResult.error");
        console.log(validationResult.error);
        */
        if (dataError != {}) {
            for (dataErr of dataError.details)
                validationResult.error.details.push(dataErr);
        }
        return Promise.reject(validationResult.error);
    } else if (dataError != {}) {
        return Promise.reject(dataError);
    }


    // let tommorowDate = convertDateIntoStringLikeInView(createTommorowDate());

    //     let updateData_Stworzenia = convertDateIntoStringLikeInView(newKomputerData.data_Stworzenia);
    // let dataError = checkDateIfAfter(updateData_Stworzenia, tommorowDate);
    // let dataError = validateDate(updateData_Stworzenia);
    /*
    console.log("BEFORE validateDate");
    let dataError = validateDate(newKomputerData.data_Stworzenia);
    // if (dataError) {
    console.log("AFTERR validateDate");
    */
    /*
     if (dataError.hasOwnProperty('details')) {
         console.log("dataError.hasOwnProperty('details') true");
         return Promise.reject(dataError);
     } else {
         */

    // normalization

    let updateData_Stworzenia = convertDateIntoStringLikeInView(newKomputerData.data_Stworzenia);
    let updateData_Stworzenia_Date = new Date(updateData_Stworzenia);

    const model = newKomputerData.model;
    const zaintstalowany_System_Operacyjny = newKomputerData.zaintstalowany_System_Operacyjny;
    const typ_Komputera = newKomputerData.typ_Komputera;
    const data_Stworzenia = updateData_Stworzenia_Date;// newKomputerData.data_Stworzenia.toISOString().split('T')[0]; // ТУТ ДОБАВИЛ
    const sql = 'INSERT INTO Komputer (model, zaintstalowany_System_Operacyjny, typ_Komputera, data_Stworzenia) VALUES (?, ?, ?, ?)';
    console.log("Before send SQL");
    return db.promise().execute(
        sql,
        [model, zaintstalowany_System_Operacyjny, typ_Komputera, data_Stworzenia]
    ).catch(err => {
        return Promise.reject(err);
    });
    // }
}

exports.updateKomputer = (komputerId, komputerData) => {
    const validationResult = komputerSchema.validate(komputerData, { abortEarly: false });
    if (validationResult.error) {
        return Promise.reject(validationResult.error);
    }
    let tommorowDate = convertDateIntoStringLikeInView(createTommorowDate());
    let updateData_Stworzenia = convertDateIntoStringLikeInView(komputerData.data_Stworzenia);
    let dataError = checkDateIfAfter(updateData_Stworzenia, tommorowDate);
    let updateData_Stworzenia_Date = new Date(updateData_Stworzenia);
    updateData_Stworzenia_Date.setDate(updateData_Stworzenia_Date.getDate() + 1); // Нормализация даты под человеческий способ отображения.
    updateData_Stworzenia = convertDateIntoStringLikeInView(updateData_Stworzenia_Date);
    //updateData_Stworzenia = updateData_Stworzenia_Date.toISOString().split('T')[0];
    // изменить тип проверки в и в методе создать
    // Разобраться из-за чего ошибка
    //if (dataError) { //.hasOwnProperty('details')
    if (dataError.hasOwnProperty('details')) {
        return Promise.reject(dataError);
    } else {

        const model = komputerData.model;
        const zaintstalowany_System_Operacyjny = komputerData.zaintstalowany_System_Operacyjny;
        const typ_Komputera = komputerData.typ_Komputera;
        const data_Stworzenia = updateData_Stworzenia; // komputerData.data_Stworzenia;

        const sql = `UPDATE Komputer 
                set model = ?,
                zaintstalowany_System_Operacyjny = ?,
                typ_Komputera = ?,
                data_Stworzenia = ?
                where _id = ?`;
        return db.promise().execute(
            sql,
            [model, zaintstalowany_System_Operacyjny, typ_Komputera, data_Stworzenia, komputerId]
        ).catch(err => {
            return Promise.reject(err);
        });


    }
};

exports.deleteKomputer = (computerId) => {
    const sql1 = 'DELETE FROM Zestaw_Elementow_Komputera where computer_id = ?';
    const sql2 = 'DELETE FROM Komputer where _id = ?';

    return db.promise().execute(sql1, [computerId])
        .then(() => {
            return db.promise().execute(sql2, [computerId])
        });

};