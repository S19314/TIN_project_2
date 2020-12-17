const ElemetnKomputeraRepository = require('../repository/mysql2/ElementKomputeraRepository');

exports.showElementKomputerList = (req, res, next) => {
    ElemetnKomputeraRepository.getElements_Komputera()
        .then(elements => {
            res.render('pages/element_komputera/computer-element-list',
                {
                    elements: elements,
                    navLocation: 'elementKomputer'
                });
        })

}

exports.showAddElementKomputerForm = (req, res, next) => {
    res.render('pages/element_komputera/computer-element-form', {});
}


exports.showElementKomputerDetails = (req, res, next) => {
    res.render('pages/element_komputera/computer-element-szegoly', {});
}
