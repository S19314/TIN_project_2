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
        btnLabel: 'Dodaj elemnt komputera',
        formAction: '/komputer-element/add',
        navLocation: 'elementKomputer'
    });
}

exports.showEditElementKomputerowyForm = (req, res, next) => {
    const elementId = req.params.elementId;
    ElementKomputeraRepository.getElement_KomputeraById(elementId)
        .then(emp => {
            res.render('pages/komputer-element/form', {
                emp: emp,
                formMode: 'edit',
                pageTitle: 'Edycja elementa kopmutera',
                btnLabel: 'Edytuj element kopmutera',
                formAction: '/komputer-element/edit',
                navLocation: 'elementKomputer'
            });
        });
};



exports.showElementKomputerDetails = (req, res, next) => {
    const elementId = req.params.elementId;
    ElementKomputeraRepository.getElement_KomputeraById(elementId)
        .then(element => {
            res.render('pages/element_komputera/computer-element-szegoly', {
                element: element,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły elementa komputera',
                formAction: '',
                navLocation: 'elementKomputer'
            })
        });
}