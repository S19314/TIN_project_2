const db = require('../../config/mysql2/db');

exports.getKomputers = () => {
    return db.promise().query('SELECT * FROM Komputer')
        .then((results, fields) => {
            console.log(results[0]);
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
        komp.model, komp.zaintstalowany_System_Operacyjny, komp.data_Stworzenia, 
        e._id as _id, e.nazwa, e.opis, e.foto_path,
		z_e_k._id as z_e_k_id,
        z_e_k.aktuakna_Temperatura, 
        z_e_k.procent_Wykorzystanych_Zasobow, 
        z_e_k.aktualna_Szybkosc_Przekazania_Danych,
        z_e_k.typPolaczenia
    FROM Komputer komp  
    left join Zestaw_Elementow_Komputera z_e_k on z_e_k._id = komp._id
    left join Element_komputera e on z_e_k._id = e._id
    where komp._id = ?`;
    return db.promise().query(query, [computerId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const computer = {
                _id: parseInt(computerId),
                model: row.model,
                zaintstalowany_System_Operacyjny: row.zaintstalowany_System_Operacyjny,
                typ_Komputera: row.typ_Komputera,
                data_Stworzenia: row.data_Stworzenia,
                zestaw_elementow_komputera: []
            };

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
                            _id: firstRow._id,
                            nazwa: firstRow.nazwa,
                            opis: firstRow.opis,
                            foto_path: firstRow.foto_path
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
    const model = newKomputerData.model;
    const zaintstalowany_System_Operacyjny = newKomputerData.zaintstalowany_System_Operacyjny;
    const typ_Komputera = newKomputerData.typ_Komputera;
    const data_Stworzenia = newKomputerData.data_Stworzenia;

    const sql = 'INSERT INTO Komputer (model, zaintstalowany_System_Operacyjny, typ_Komputera, data_Stworzenia) VALUES (?, ?, ?)';
    return db.promise().execute(
        sql,
        [model, zaintstalowany_System_Operacyjny, typ_Komputera, data_Stworzenia]
    );
};

exports.updateKomputer = (komputerId, komputerData) => {
    const model = komputerData.model;
    const zaintstalowany_System_Operacyjny = komputerData.zaintstalowany_System_Operacyjny;
    const typ_Komputera = komputerData.typ_Komputera;
    const data_Stworzenia = komputerData.data_Stworzenia;
    const sql = `UPDATE Komputer 
                set model = ?,
                zaintstalowany_System_Operacyjny = ?,
                typ_Komputera = ?,
                data_Stworzenia = ?
                where _id = ?`;
    return db.promise().execute(
        sql,
        [model, zaintstalowany_System_Operacyjny, typ_Komputera, data_Stworzenia, komputerId]
    );
};

exports.deleteKomputer = (komputerId) => {
    const sql1 = 'DELETE FROM Zestaw_Elementow_Komputera where computer_id = ?';
    const sql2 = 'DELETE FROM Komputer where _id = ?';

    return db.promise().execute(sql1, [komputerId])
        .then(() => {
            return db.promise().execute(sql2, [komputerId])
        });

};