const ZestawRepository = require('../repository/mysql2/ZestawElementaKomputeraRepository');

exports.getZestawyElementowKomputera = (req, res, next) => {
    ZestawRepository.getZestawyElementowKomputera()
        .then(zestaws => {
            res.status(200).json(zestaws);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getZestawyElementowKomputeraById = (req, res, next) => {
    const zestawId = req.params.zestawId;
    ZestawRepository.getZestawyElementowKomputeraById(zestawId)
        .then(zestaw => {
            if (!zestaw) {
                res.status(404).json({
                    message: 'Zestaw with id: ' + zestawId + ' not found'
                })
            } else {
                res.status(200).json(zestaw);
            }
        });
};

exports.createZestawElementaKomputera = (req, res, next) => {
    ZestawRepository.createZestawElementaKomputera(req.body)
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

exports.updateZestawElementaKomputera = (req, res, next) => {
    const zestawId = req.params.zestawId;
    ZestawRepository.updateZestawElmentaKomputera(zestawId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Zestaw elementa komputera z komputerą updated!', zestaw_elementa_i_komputera: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteZestawElementaKomputera = (req, res, next) => {
    const zestawId = req.params.zestawId;
    KomputerRepository.deleteZestawElementaKomputera(zestawId)
        .then(result => {
            res.status(200).json({ message: 'Removed zestaw elementa komputer z komputerą', zestaw_elementa_i_komputera: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};