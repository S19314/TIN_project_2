

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
    res.render('pages/komputer/universal-form',
        {
            komputer: {},
            pageTitle: 'Nowy komputer',
            formMode: 'createNew',
            btnLabel: 'Dodaj komputer',
            formAction: '/komputers/add', // GIT ?  Хорошо*???
            navLocation: 'komputer'
        });
}

exports.showKomputerDetails = (req, res, next) => {
    const komputerId = req.params.komputerId;
    let allKomputers;
    KomputerRepository.getKomputers()
        .then(allKomps => {
            allKomputers = allKomps;
            return KomputerRepository.getKomputerById(komputerId);
        })
        .then(komputer => {
            console.log("Kopmuter\Data:");
            console.log(komputer);
            res.render('pages/komputer/universal-form', {
                allKomputers: allKomputers,
                komputer: komputer,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły komputera',
                formAction: '',
                navLocation: 'komputer'
            })
        }
        );
}
exports.showEditKomputerForm = (req, res, next) => {
    const komputerId = req.params.komputerId;
    KomputerRepository.getKomputerById(komputerId)
        .then(komputer => {
            res.render('pages/komputer/universal-form', {
                komputer: komputer,
                formMode: 'edit',
                pageTitle: 'Edycja kopmutera',
                btnLabel: 'Zatwierdź kopmuter',
                formAction: '/komputers/edit',
                navLocation: 'komputer'
            });
        });
};

// obsługa akcji formularza
exports.addKomputer = (req, res, next) => {
    const newKomputerData = { ...req.body };
    KomputerRepository.createKomputer(newKomputerData)
        .then(result => {
            res.redirect('/komputers');
        });
};

exports.updateKomputer = (req, res, next) => {
    const komputerId = req.body._id;
    const komputerData = { ...req.body };
    console.log("komputerData");
    console.log(komputerData);
    KomputerRepository.updateKomputer(komputerId, komputerData)
        .then(result => {
            res.redirect('/komputers');
        });
};

exports.deleteKomputer = (req, res, next) => {
    const computerId = req.params.komputerId;
    KomputerRepository.deleteKomputer(computerId)
        .then(() => {
            res.redirect('/komputers');
        });
};


