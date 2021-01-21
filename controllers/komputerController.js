

const e = require('express');
const { all } = require('../app');
const KomputerRepository = require('../repository/mysql2/KomputerRepository');

function dateNormalization(dateAsString) {
    if (dateAsString === '')
        return dateAsString;

    return new Date(dateAsString);
}

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
            KomputerRepository.getKomputers()
                .then(allKomputers => {
                    let newKomputerDataLikeInDB = { 'zestaw_elementow_komputera': [], ...newKomputerData };
                    newKomputerDataLikeInDB.data_Stworzenia = dateNormalization(newKomputerDataLikeInDB.data_Stworzenia); // dateAsString);
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
            console.log("ShowKomputerDetails");
            console.log("komputer");
            console.log(komputer);
            console.log("elementkomputer[0]");
            console.log(komputer.zestaw_elementow_komputera[0].element_komputera);
            console.log("elementkomputer[0]._id");
            console.log(komputer.zestaw_elementow_komputera[0].element_komputera._id);
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



/*
       Дело в том, что нормализируется дата (если она не пустая) для uipdate, но не для  create. 
       И при splt('T') в view, она выбивает ошибку.
       План: 1. почистить код (ибо чёрт ногу сломает), в репозиотрии и в контроллере. 
       2. Вынести общие моменты в функции
       3. Дописать нормализацию даты в контроллере и в репозиотрии для create.
    */
exports.updateKomputer = (req, res, next) => {
    const komputerId = req.body._id;
    const komputerData = { ...req.body };
    KomputerRepository.updateKomputer(komputerId, komputerData)
        .then(result => {
            res.redirect('/komputers');
        })
        .catch(err => {
            KomputerRepository.getKomputers()
                .then(allKomps => {

                    let newKomputerData = { 'zestaw_elementow_komputera': [], ...komputerData };
                    // let dateAsString = newKomputerData.data_Stworzenia; // check
                    // И в create/update пересмотреть.
                    newKomputerData.data_Stworzenia = dateNormalization(newKomputerData.data_Stworzenia); // dateAsString);
                    res.render('pages/komputer/universal-form', {
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


