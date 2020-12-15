const KomputerRepository = require('../repository/mysql2/KomputerRepository');

exports.getKomputers = (req, res, next) => {
    KomputerRepository.getKomputers()
        .then(computers => {
            res.status(200).json(computers);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getKomputerById = (req, res, next) => {
    const computerId = req.params.computerId;
    KomputerRepository.getKomputerById(computerId)
        .then(computer => {
            if (!computer) {
                res.status(404).json({
                    message: 'Element komputera with id: ' + computerId + ' not found'
                })
            } else {
                res.status(200).json(computer);
            }
        });
};

exports.createKomputer = (req, res, next) => {
    KomputerRepository.createKomputer(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateKomputer = (req, res, next) => {
    const computerId = req.params.computerId;
    KomputerRepository.updateKomputer(computerId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Komputera updated!', komputer: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteKomputer = (req, res, next) => {
    const computerId = req.params.computerId;
    KomputerRepository.deleteElement_Komputera(computerId)
        .then(result => {
            res.status(200).json({ message: 'Removed komputer', komputer: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};