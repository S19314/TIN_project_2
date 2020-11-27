exports.showElementKomputerList = (req, res, next) => {
    res.render('pages/element_komputera/computer-element-list', { navLocation: 'elementKomputer' });
}

exports.showAddElementKomputerForm = (req, res, next) => {
    res.render('pages/element_komputera/computer-element-form', {});
}


exports.showElementKomputerDetails = (req, res, next) => {
    res.render('pages/element_komputera/computer-element-szegoly', {});
}
