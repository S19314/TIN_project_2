exports.showZestawElementKomputerList = (req, res, next) => {
    res.render('pages/zestaw_elementa_i_komputera/zestaw-elementow-komputera-list', { navLocation: 'zestawElementaKomputera' });
}

exports.showAddZestawElementKomputerForm = (req, res, next) => {
    res.render('pages/zestaw_elementa_i_komputera/zestaw-elementow-komputera-form', {});
}


exports.showZestawElementKomputerDetails = (req, res, next) => {
    res.render('pages/zestaw_elementa_i_komputera/zestaw-elementow-komputera-szegoly', {});
}
