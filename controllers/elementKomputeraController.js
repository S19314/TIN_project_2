const e = require('express');
const ElementKomputeraRepository = require('../repository/mysql2/ElementKomputeraRepository');

exports.showElementKomputerList = (req, res, next) => {
    ElementKomputeraRepository.getElements_Komputera()
        .then(elements => {
            res.render('pages/element_komputera/list',
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
        navLocation: 'elementKomputer'
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
                btnLabel: 'Zatwirdź element kopmutera',
                formAction: '/komputer-element/edit',
                navLocation: 'elementKomputer'
            });
        });
};


// 
exports.showElementKomputerDetails = (req, res, next) => {
    const elementId = req.params.elementId;
    ElementKomputeraRepository.getElement_KomputeraById(elementId)
        .then(element => {
            res.render('pages/element_komputera/computer-element-form', {
                element: element,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły elementa komputera',
                formAction: '',
                navLocation: 'elementKomputer'
            })
        });
}


// obsługa akcji formularza
exports.addElementKomputera = (req, res, next) => {
    const elementData = { ...req.body };
    ElementKomputeraRepository.createElement_Komputera(elementData)
        .then(result => {
            res.redirect('/komputer-element');
        });
};

exports.updateElementKomputera = (req, res, next) => {
    const elementId = req.body._id;
    const elementData = { ...req.body };
    console.log("elementData");
    console.log(elementData);
    ElementKomputeraRepository.updateElement_Komputera(elementId, elementData)
        .then(result => {
            res.redirect('/komputer-element');
        });
};

exports.deleteElementKomputera = (req, res, next) => {
    const elementId = req.params.elementId;
    ElementKomputeraRepository.deleteElement_Komputera(elementId)
        .then(() => {
            res.redirect('/komputer-element');
        });
};


