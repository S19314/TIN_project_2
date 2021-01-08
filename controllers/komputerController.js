

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
            newKomputerData = { 'zestaw_elementow_komputera': [], ...newKomputerData };
            res.render('pages/element_komputera/computer-element-form', {
                komputer: newKomputerData,
                pageTitle: 'Nowy komputer',
                formMode: 'createNew',
                btnLabel: 'Dodaj komputer',
                formAction: '/komputers/add',
                navLocation: 'komputer',
                validationErrors: err.details
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
            // console.log("Kopmuter\Data:");
            // console.log(komputer);
            /*
            console.log("showDETAILSKomputerForm");
            console.log(komputer);
*/
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
exports.updateKomputer = (req, res, next) => {
    const komputerId = req.body._id;
    const komputerData = { ...req.body };
    KomputerRepository.updateKomputer(komputerId, komputerData)
        .then(result => {
            res.redirect('/komputers');
        })
        .catch(err => {
            const newKomputerData = { 'zestaw_elementow_komputera': [], ...komputerData };
            res.render('pages/komputer/universal-form', {
                komputer: newKomputerData,
                pageTitle: 'Edycja komputera',
                formMode: 'edit',
                btnLabel: 'Zatwierdź komputer',
                formAction: '/komputers/edit',
                navLocation: 'komputer',
                validationErrors: err.details
            });

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


