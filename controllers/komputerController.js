exports.showKomputerList = (req, res, next) => {
    res.render('pages/komputer/computer-list');
}

exports.showAddKomputerForm = (req, res, next) => {
    res.render('pages/komputer/computer-form', {});
}


exports.showKomputerDetails = (req, res, next) => {
    res.render('pages/komputer/computer-szegoly', {});
}
