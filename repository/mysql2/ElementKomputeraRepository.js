const db = require('../../config/mysql2/db');
const elementSchema = require('../../model/joi/ElementKomputera');
const fileSystem = require("fs");
const { func } = require('joi');
const e = require('express');
const { path } = require('../../app');
const originPathPhoto = '../../uploads';
const table_schema = 'tin-computer-state',
    table_name = 'Element_komputera';

exports.getElements_Komputera = () => {
    return db.promise().query('SELECT * FROM Element_komputera')
        .then((results, fields) => {
            //            console.log(results[0]);
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
        komp._id as komp_id, komp.model, komp.zaintstalowany_System_Operacyjny, komp.typ_Komputera, 		
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
            // console.log("firstRow getElement_KopmuteraById");
            // console.log(firstRow);
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
                            _id: firstRow.komp_id, // row.komp_id,
                            model: firstRow.model,//row.model,
                            zaintstalowany_System_Operacyjny: firstRow.zaintstalowany_System_Operacyjny, // row.zaintstalowany_System_Operacyjny,
                            typ_Komputera: firstRow.typ_Komputera, // row.typ_Komputera,
                            data_Stworzenia: firstRow.data_Stworzenia, //row.data_Stworzenia
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

// function 
getLastId_Element_Komputera = () => {
    console.log("START In getLastId_Element_Komputera()");
    const query = `SELECT MAX(e._id) as _id  FROM Element_komputera e;`;

    return db.promise().query(query)
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return -1;
            }
            return firstRow._id;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};


function writeFotoIntoFyleSystem(foto) {
    if (foto === null) return;
    getLastId_Element_Komputera()
        .then(resultId => {
            if (resultId === -1) resultId = 1;

            fileSystem.mkdir(originPathPhoto + "/" + resultId);
            fileSystem.open(resultId + "__foto.", 'wx', (err, foto) => {
                if (err) {
                    if (err.code === 'EEXIST') {
                        console.error('myfile already exists');
                        return;
                    }

                    throw err;
                }

                writeMyData(fd);
            });

        });

}
function removeFile(filePath) {
    console.log("Remove file start");
    if (fileSystem.existsSync(filePath)) {
        fileSystem.unlinkSync(filePath, (err) => {
            if (err) console.log("error during unlink file");
        });
    }
}

// function moveToUniqueDirectory(elementId) {
moveToUniqueDirectory = (elementId) => {
    return new Promise((resolve, reject) => {
        console.log("START moveToUniqueDirectory");
        console.log("elementId");
        console.log(elementId);
        const directoryImages = "public/uploads";
        let sourcePath,
            targetPath;
        let item;
        return fileSystem.readdir(directoryImages, function (err, items) {
            console.log("fileSystem.readdir(directoryImages, function (err, items) {");
            if (err) {
                console.log("error");
                console.log(err);
            }

            /*
                    for (var i = 0; i < items.length; i++) {
                        console.log(items[i]);
                    }
            */
            for (var i = 0; i < items.length; i++) {
                let stat = fileSystem
                    .statSync(directoryImages + "/" + items[i], function (err, data) {
                        if (err) {
                            console.log("ERROR statSync");
                            console.log(err);
                        }
                    });
                if (stat.isFile()) {
                    item = items[i];
                    break;
                }
            }
            console.log("after is file");

            sourcePath = directoryImages + "/" + item;
            targetPath = directoryImages + "/" + elementId + "/" + item;
            if (elementId === -1) elementId = 1;
            if (!fileSystem.existsSync(directoryImages + "/" + elementId))
                fileSystem.mkdir(directoryImages + "/" + elementId, function (error, data) {
                    if (error) {
                        console.log("ERROR mkdir");
                        console.log(error);
                        throw error;
                    }
                    // console.log(data);
                });
            removeFile(targetPath);
            fileSystem.rename(sourcePath, targetPath, function (error, data) {
                if (error) {
                    console.log("ERROR renameFile");
                    console.log(error);
                    throw error;
                }
                // console.log(data);
            });
            console.log("targetPath");
            console.log(targetPath);
            resolve("/uploads/" + elementId + "/" + item);
        });
    });
}


updatePathFoto = (elemId, path) => {
    console.log("updateFoto START");
    const sql = `UPDATE Element_komputera set foto_path = ? where _id = ? ;`;
    console.log("updateFoto END");
    return db.promise().execute(sql, [path, elemId]);
    // .then(() => { });
}

getPathFoto = (elementId) => {
    const sql = `SELECT foto_path FROM Element_komputera  where _id = ? ;`;
    console.log("getPathFoto");
    console.log("elementId");
    console.log(elementId);
    return db.promise().query(sql, elementId)
        .then((results, fields) => {
            const firstRow = results[0][0];
            console.log("In getPathFoto firstRow");
            console.log(firstRow);
            if (!firstRow) {
                return 'none';
            }
            return firstRow.foto_path;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}



getAutoIncrement = (table_schema, table_name) => {

    const sql = ` SELECT AUTO_INCREMENT FROM  INFORMATION_SCHEMA.TABLES
                  WHERE TABLE_SCHEMA = ?
                  AND   TABLE_NAME = ? ;`;
    return db.promise().query(sql, [table_schema, table_name])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return 0;
            }
            return firstRow.AUTO_INCREMENT;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}
/*
function getPathToImage() {
}
*/

exports.createElement_Komputera = (newElementData) => {
    console.log("START createElementKOmputeara");
    const validateResultElement = elementSchema.validate(newElementData, { abortEarly: false });
    if (validateResultElement.error) {
        console.log("In validate error");
        console.log(validateResultElement.error);
        return Promise.reject(validateResultElement.error);
    }

    // Тут добавить функцию, которая будет сохранять в файловую систему отправляемую фотографию
    // После закачки в файловую систему, в foto_path конкатанация с originPathPhoto И запись в БД
    console.log("After validation of error");


    let elementId;
    return getAutoIncrement(table_schema, table_name)
        .then((elemId) => {
            elementId = elemId;
            console.log("elemID");
            console.log("moveToUniqueDirectory RESULT");
            return moveToUniqueDirectory(elemId + 1)
                .then((path) => {
                    console.log("AFTER moveToUniqueDirectory");
                    const foto_path = path;
                    console.log("foto_path");
                    console.log(foto_path);
                    const nazwa = newElementData.nazwa;
                    const opis = newElementData.opis;
                    console.log("Here your SQL insert into");

                    const sql = 'INSERT INTO Element_komputera (nazwa, opis, foto_path) VALUES (?, ?, ?)';
                    return db.promise().execute(sql, [nazwa, opis, foto_path]);
                })

        });
}

exports.updateElement_Komputera = (elementId, elementData) => {
    const validateResultElement = elementSchema.validate(elementData, { abortEarly: false });
    if (validateResultElement.error) {
        return Promise.reject(validateResultElement.error);
    }

    const nazwa = elementData.nazwa;
    const opis = elementData.opis;
    return moveToUniqueDirectory(elementId)
        .then(path => {
            //   const foto_path = elementData.foto_path; // DOWN Ubrat'
            const foto_path = path; // 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2019/10/pr_2019_10_25_13_53_0_788_06.jpg';
            const sql = `UPDATE Element_komputera set nazwa = ?, opis = ?, foto_path = ? where _id = ?`;
            return db.promise().execute(sql, [nazwa, opis, foto_path, elementId]);
        });
};

exports.deleteElement_Komputera = (elementId) => {
    const sql1 = 'DELETE FROM Zestaw_Elementow_Komputera where element_id = ?';
    const sql2 = 'DELETE FROM Element_komputera where _id = ?';
    let pathFile;
    return db.promise().execute(sql1, [elementId])
        .then(() => {
            return getPathFoto(elementId);
        })
        .then(path => {
            console.log("Delete path");
            console.log(path);
            pathFile = path;
            return db.promise().execute(sql2, [elementId])
        })
        .then(() => {
            removeFile(pathFile);
        });



};