

const e = require('express');
const { all } = require('../app');
const KomputerRepository = require('../repository/mysql2/KomputerRepository');

exports.showKomputerList = (req, res, next) => {
    KomputerRepository.getKomputers()
        .then(komputers => {
            res.render('pages/komputer/universal-list',
                {
                    komputers: komputers,
                    navLocation: 'komputer'
                });
        })

}
exports.showAddKomputerForm = (req, res, next) => {
    let allKomputers;
    KomputerRepository.getKomputers()
        .then(allKomps => {
            allKomputers = allKomps;
            res.render('pages/komputer/universal-form',
                {
                    allKomputers: allKomputers,
                    komputer: {},
                    pageTitle: 'Nowy komputer',
                    formMode: 'createNew',
                    btnLabel: 'Dodaj komputer',
                    formAction: '/komputers/add',
                    navLocation: 'komputer',
                    validationErrors: []
                });
        })
}
exports.addKomputer = (req, res, next) => {
    const newKomputerData = { ...req.body };
    KomputerRepository.createKomputer(newKomputerData)
        .then(result => {
            res.redirect('/komputers');
        })
        .catch(err => {
            /* Мб проблема в недостатке переменных. Попробовать удалить для массива z_e_k? В форме? */
            KomputerRepository.getKomputers()
                .then(allKomputers => {
                    let newKomputerDataLikeInDB = { 'zestaw_elementow_komputera': [], ...newKomputerData };
                    console.log("State of newKomputerDataLikeInDB");
                    console.log(newKomputerDataLikeInDB);
                    console.log("State of allKomputers");
                    console.log(allKomputers);
                    newKomputerDataLikeInDB.data_Stworzenia = new Date(newKomputerData.data_Stworzenia);
                    res.render('pages/komputer/universal-form', {
                        komputer: newKomputerDataLikeInDB,
                        allKomputers: allKomputers,
                        pageTitle: 'Nowy komputer',
                        formMode: 'createNew',
                        btnLabel: 'Dodaj komputer',
                        formAction: '/komputers/add',
                        navLocation: 'komputer',
                        validationErrors: err.details
                    });
                });
        })
        ;
};

exports.showKomputerDetails = (req, res, next) => {
    const komputerId = req.params.komputerId;
    let allKomputers;
    KomputerRepository.getKomputers()
        .then(allKomps => {
            allKomputers = allKomps;
            return KomputerRepository.getKomputerById(komputerId);
        })
        .then(komputer => {
            res.render('pages/komputer/universal-form', {
                allKomputers: allKomputers,
                komputer: komputer,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły komputera',
                formAction: '',
                navLocation: 'komputer',
                validationErrors: []
            })
        }
        );
}
exports.showEditKomputerForm = (req, res, next) => {
    // console.log("showEditKomputerForm BEGIN\nkomputerId:");

    const komputerId = req.params.komputerId;
    // console.log(komputerId);
    let allKomputers;
    KomputerRepository.getKomputers()
        .then(allKomps => {
            allKomputers = allKomps;
            return KomputerRepository.getKomputerById(komputerId);
        })
        .then(komputer => {
            res.render('pages/komputer/universal-form', {
                allKomputers: allKomputers,
                komputer: komputer,
                formMode: 'edit',
                pageTitle: 'Edycja komputera',
                btnLabel: 'Zatwierdź komputer',
                formAction: '/komputers/edit',
                navLocation: 'komputer',
                validationErrors: []
            })
        });
};


function dateNormalization(date) {
    /*
       Дело в том, что нормализируется дата (если она не пустая) для uipdate, но не для  create. 
       И при splt('T') в view, она выбивает ошибку.
       План: 1. почистить код (ибо чёрт ногу сломает), в репозиотрии и в контроллере. 
       2. Вынести общие моменты в функции
       3. Дописать нормализацию даты в контроллере и в репозиотрии для create.
    */
}
exports.updateKomputer = (req, res, next) => {
    // console.log("Update komp ");
    const komputerId = req.body._id;
    //  console.log("after kompId");
    const komputerData = { ...req.body };
    // console.log("after kompData");
    // console.log("after переменные, begin Repository");
    KomputerRepository.updateKomputer(komputerId, komputerData)
        .then(result => {
            res.redirect('/komputers');
        })
        .catch(err => { // Где-то тут error
            //      console.log("Начало catch");
            KomputerRepository.getKomputers()
                .then(allKomps => {
                    //           console.log("Начало then");
                    let newKomputerData = { 'zestaw_elementow_komputera': [], ...komputerData }; // Exception is there?
                    console.log("NewKOmputerDAta");
                    console.log(newKomputerData);
                    if (newKomputerData.data_Stworzenia != '') {
                        console.log('newKomputerData.data_Stworzenia != undefined/pusto');
                        newKomputerData.data_Stworzenia = new Date(newKomputerData.data_Stworzenia);
                    }

                    console.log("newKomputerData with normalizated Date\nSTART");
                    console.log(newKomputerData);
                    console.log("ERR.DETAIKLS");
                    console.log(err);
                    console.log("err.details");
                    console.log(err.details);
                    for (let det of err.details) {
                        console.log("err.details[i].path");
                        console.log(det.path);
                    }
                    /*
                    console.log("err.details[0].path");
                    console.log(err.details[0].path);
                    */
                    //  console.log("newKomputerData\nEND");
                    // console.log("allKomps\nSTART");
                    // console.log(allKomps);
                    // console.log("allKomps\nEND");
                    res.render('pages/komputer/universal-form', { // ИЗМЕНИТЬ ПУТЬ НА ПРЕЖНИЙ!!!. // universal-form_copy_3
                        // res.render('pages/komputer/universal-form_copy_3', {
                        komputer: newKomputerData,
                        allKomputers: allKomps,
                        pageTitle: 'Edycja komputera',
                        formMode: 'edit',
                        btnLabel: 'Zatwierdź komputer',
                        formAction: '/komputers/edit',
                        navLocation: 'komputer',
                        validationErrors: err.details
                    });
                })
        });

};


// obsługa akcji formularza


exports.deleteKomputer = (req, res, next) => {
    const computerId = req.params.komputerId;
    KomputerRepository.deleteKomputer(computerId)
        .then(() => {
            res.redirect('/komputers');
        });
};


