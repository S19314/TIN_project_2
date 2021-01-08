const e = require('express');
const db = require('../../config/mysql2/db');
const zestawSchema = require('../../model/joi/ZestawElementaIKomputera');



exports.getZestawyElementowKomputera = () => {
    const query = `SELECT z_e_k._id as z_e_k_id,
    z_e_k.aktuakna_Temperatura, 
    z_e_k.procent_Wykorzystanych_Zasobow, 
    z_e_k.aktualna_Szybkosc_Przekazania_Danych,
    z_e_k.typPolaczenia,
    komp._id as komp_id,
    komp.model,
    komp.zaintstalowany_System_Operacyjny, 		
    komp.data_Stworzenia,
    komp.typ_Komputera,
    e._id as element_id, e.nazwa, e.opis, e.foto_path
    FROM Zestaw_Elementow_Komputera z_e_k 
    left join Element_komputera e on z_e_k.element_id = e._id
    left join Komputer komp on z_e_k.computer_id = komp._id`;

    return db.promise().query(query)
        .then((results, fields) => {
            const zestawy_elementa_komputera = []; // For the future: use English words and with 'S' at the end, but not in the middle of the word
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
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
                    },
                    element_komputera: {
                        _id: row.element_id,
                        nazwa: row.nazwa,
                        opis: row.opis,
                        foto_path: row.foto_path
                    }
                };
                zestawy_elementa_komputera.push(zestaw_elementa_komputera);
            }
            // console.log(zestawy_elementa_komputera);
            return zestawy_elementa_komputera;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getZestawElementaKomputeraById = (zestawId) => {
    const query = `SELECT z_e_k._id as z_e_k_id,
                    z_e_k.aktuakna_Temperatura, 
                    z_e_k.procent_Wykorzystanych_Zasobow, 
                    z_e_k.aktualna_Szybkosc_Przekazania_Danych,
                    z_e_k.typPolaczenia,
                    komp._id as komp_id,
                    komp.model,
                    komp.zaintstalowany_System_Operacyjny, 		
                    komp.data_Stworzenia,
                    komp.typ_Komputera,
                    e._id as element_id, e.nazwa, e.opis, e.foto_path
                    FROM Zestaw_Elementow_Komputera z_e_k 
                    left join Element_komputera e on z_e_k.element_id = e._id
                    left join Komputer komp on z_e_k.computer_id = komp._id
                    WHERE z_e_k._id = ?`;
    return db.promise().query(query, [zestawId])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return {};
            }
            const zestaw_elementa_komputera = {
                _id: parseInt(zestawId),
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
                },
                element_komputera: {
                    _id: row.element_id,
                    nazwa: row.nazwa,
                    opis: row.opis,
                    foto_path: row.foto_path
                }
            };

            // console.log(zestaw_elementa_komputera);
            return zestaw_elementa_komputera;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createZestawElementaKomputera = (data) => {
    const validationResult = zestawSchema.validate(data, { abortEarly: false });
    if (validationResult.error) {
        return Promise.reject(validationResult.error);
    }
    const sql = 'INSERT into ' +
        ' Zestaw_Elementow_Komputera ' +
        ' (element_id, computer_id, aktuakna_Temperatura, procent_Wykorzystanych_Zasobow, aktualna_Szybkosc_Przekazania_Danych, typPolaczenia) ' +
        ' VALUES (?, ?, ?, ?, ?, ?)';
    return db.promise().execute(
        sql,
        [data.elementId, data.komputerId, data.aktualnaTemperatura, data.procentWykorzystanychZasobow, data.aktualnaSzybkoscPrzekazaniaDanych, data.typPolaczenia]
    );
};

exports.updateZestawElmentaKomputera = (zestawId, data) => {
    const validationResult = zestawSchema.validate(data, { abortEarly: false });
    if (validationResult.error) {
        return Promise.reject(validationResult.error);
    }
    const sql = `UPDATE Zestaw_Elementow_Komputera 
                set element_id = ?,
                computer_id = ?,
                aktuakna_Temperatura = ?,
                procent_Wykorzystanych_Zasobow = ?,
                aktualna_Szybkosc_Przekazania_Danych = ?,
                typPolaczenia = ?
                where _id = ?`;
    return db.promise().execute(
        sql,
        [data.elementId, data.komputerId, data.aktualnaTemperatura, data.procentWykorzystanychZasobow, data.aktualnaSzybkoscPrzekazaniaDanych, data.typPolaczenia, zestawId]
    );
}

exports.deleteZestawElementaKomputera = (zestawId) => {
    const sql = 'DELETE FROM Zestaw_Elementow_Komputera where _id = ?'
    return db.promise().execute(sql, [zestawId]);
}

exports.deleteManyZestawyElmentaKomputera = (zetawIds) => {
    const sql = 'DELETE FROM Zestaw_Elementow_Komputera where _id IN (?)'
    return db.promise().execute(sql, [zetawIds]);
}

