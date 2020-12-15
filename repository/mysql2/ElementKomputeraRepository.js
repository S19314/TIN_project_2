const db = require('../../config/mysql2/db');

exports.getElements_Komputera = () => {
    return db.promise().query('SELECT * FROM Element_komputera')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getElement_KomputeraById = (elementId) => {
    const query = ` 
    SELECT e._id as _id, e.nazwa, e.opis, e.foto_path,
		z_e_k._id as z_e_k_id,
        z_e_k.aktuakna_Temperatura, 
        z_e_k.procent_Wykorzystanych_Zasobow, 
        z_e_k.aktualna_Szybkosc_Przekazania_Danych,
        z_e_k.typPolaczenia,
        komp._id as komp_id, komp.model, komp.zaintstalowany_System_Operacyjny, 		
        komp.data_Stworzenia 
    FROM Element_komputera e 
    left join Zestaw_Elementow_Komputera z_e_k on z_e_k._id = e._id
    left join Komputer komp on z_e_k._id = komp._id
    where e._id = ?`;
    return db.promise().query(query, [elementId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const element_komputera = {
                _id: parseInt(elementId),
                nazwa: firstRow.nazwa,
                opis: firstRow.opis,
                foto_path: firstRow.foto_path,
                zestaw_elementow_komputera: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.z_e_k_id) {
                    const zestaw_elementa_komputera = {
                        _id: row.z_e_k_id,
                        aktuakna_Temperatura: row.aktuakna_Temperatura,
                        procent_Wykorzystanych_Zasobow: row.procent_Wykorzystanych_Zasobow,
                        aktualna_Szybkosc_Przekazania_Danych: row.aktualna_Szybkosc_Przekazania_Danych,
                        typPolaczenia: row.typPolaczenia,
                        komputer: {
                            _id: row.komp_id,
                            model: row.model,
                            zaintstalowany_System_Operacyjny: row.zaintstalowany_System_Operacyjny,
                            typ_Komputera: row.typ_Komputera,
                            data_Stworzenia: row.data_Stworzenia
                        }
                    };
                    element_komputera.zestaw_elementow_komputera.push(zestaw_elementa_komputera);
                }
            }
            return element_komputera;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createElement_Komputera = (newElementData) => {
    const nazwa = newElementData.nazwa;
    const opis = newElementData.opis;
    const foto_path = newElementData.foto_path;
    const sql = 'INSERT INTO Element_komputera (nazwa, opis, foto_path) VALUES (?, ?, ?)';
    return db.promise().execute(sql, [nazwa, opis, foto_path]);
};

exports.updateElement_Komputera = (elementId, elementData) => {
    const nazwa = elementData.nazwa;
    const opis = elementData.opis;
    const foto_path = elementData.foto_path;
    const sql = `UPDATE Element_komputera set nazwa = ?, opis = ?, foto_path = ? where _id = ?`;
    return db.promise().execute(sql, [nazwa, opis, foto_path, elementId]);
};

exports.deleteElement_Komputera = (elementId) => {
    const sql1 = 'DELETE FROM Zestaw_Elementow_Komputera where element_id = ?';
    const sql2 = 'DELETE FROM Element_komputera where _id = ?';

    return db.promise().execute(sql1, [elementId])
        .then(() => {
            return db.promise().execute(sql2, [elementId])
        });

};