const e = require('express');
const ElementKomputeraRepository = require('../repository/mysql2/ElementKomputeraRepository');

exports.showElementKomputerList = (req, res, next) => {
    ElementKomputeraRepository.getElements_Komputera()
        .then(elements => {
            res.render('pages/element_komputera/computer-element-list',
                {
                    elements: elements,
                    navLocation: 'elementKomputer'
                });
        })

}

exports.showAddElementKomputerForm = (req, res, next) => {
    res.render('pages/element_komputera/computer-element-form', {
        element: {},
        pageTitle: 'Nowy element komputera',
        formMode: 'createNew',
        btnLabel: 'Dodaj element komputera',
        formAction: '/komputer-element/add',
        navLocation: 'elementKomputer',
        validationErrors: []
    });
}

exports.showEditElementKomputerowyForm = (req, res, next) => {
    const elementId = req.params.elementId;
    ElementKomputeraRepository.getElement_KomputeraById(elementId)
        .then(element => {
            res.render('pages/element_komputera/computer-element-form', {
                element: element,
                formMode: 'edit',
                pageTitle: 'Edycja elementa kopmutera',
                btnLabel: 'Zatwierdź element kopmutera',
                formAction: '/komputer-element/edit',
                navLocation: 'elementKomputer',
                validationErrors: []
            });
        });
};


// 
exports.showElementKomputerDetails = (req, res, next) => {

    const elementId = req.params.elementId;
    ElementKomputeraRepository.getElement_KomputeraById(elementId)
        .then(element => {
            console.log("elementKomputera\nData:");
            console.log(element);
            res.render('pages/element_komputera/computer-element-form', {
                element: element,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły elementa komputera',
                formAction: '',
                navLocation: 'elementKomputer',
                validationErrors: []
            })
        });
}


// obsługa akcji formularza
exports.addElementKomputera = (req, res, next) => {
    const elementData = { ...req.body };
    ElementKomputeraRepository.createElement_Komputera(elementData)
        .then(result => {
            res.redirect('/komputer-element');
        })
        .catch(err => {
            res.render('pages/element_komputera/computer-element-form', {
                element: elementData,
                pageTitle: 'Dodawanie elementa komputera',
                formMode: 'createNew',
                btnLabel: 'Dodaj element komputera',
                formAction: '/komputer-element/add',
                navLocation: 'elementKomputer',
                validationErrors: err.details
            });
        });
};

exports.updateElementKomputera = (req, res, next) => {
    const elementId = req.body._id;
    const elementData = { ...req.body };
    /*
    console.log("elementData");
    console.log(elementData);
    */
    ElementKomputeraRepository.updateElement_Komputera(elementId, elementData)
        .then(result => {
            res.redirect('/komputer-element');
        })
        .catch(err => {
            res.render('pages/element_komputera/computer-element-form', {
                element: element,
                pageTitle: 'Edycja elementa kopmutera',
                formMode: 'edit',
                btnLabel: 'Zatwierdź element kopmutera',
                formAction: '/komputer-element/edit',
                navLocation: 'elementKomputer',
                validationErrors: err.details
            });
        });

};

exports.deleteElementKomputera = (req, res, next) => {
    const elementId = req.params.elementId;
    ElementKomputeraRepository.deleteElement_Komputera(elementId)
        .then(() => {
            res.redirect('/komputer-element');
        });
};


