const ElementKomputeraRepository = require('../repository/mysql2/ElementKomputeraRepository');

exports.getElements_Komputera = (req, res, next) => {
    ElementKomputeraRepository.getElements_Komputera()
        .then(elements => {
            res.status(200).json(elements);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getElement_KomputeraById = (req, res, next) => {
    const elementId = req.params.elementId;
    ElementKomputeraRepository.getElement_KomputeraById(elementId)
        .then(element => {
            if (!element) {
                res.status(404).json({
                    message: 'Element komputera with id: ' + elementId + ' not found'
                })
            } else {
                res.status(200).json(element);
            }
        });
};

exports.createElement_Komputera = (req, res, next) => {
    ElementKomputeraRepository.createElement_Komputera(req.body)
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

exports.updateElement_Komputera = (req, res, next) => {
    const elementId = req.params.elementId;
    ElementKomputeraRepository.updateElement_Komputera(elementId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Element komputera updated!', element_komputera: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteElement_Komputera = (req, res, next) => {
    const elementId = req.params.elementId;
    ElementKomputeraRepository.deleteElement_Komputera(elementId)
        .then(result => {
            res.status(200).json({ message: 'Removed element komputera', element_komputera: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

