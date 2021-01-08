const e = require('express');
const ZestawElementaKomputeraRepository = require('../repository/mysql2/ZestawElementaKomputeraRepository');
const KomputerRepository = require('../repository/mysql2/KomputerRepository');
const ElementKomputeraRepository = require('../repository/mysql2/ElementKomputeraRepository');

exports.showZestawElementKomputerList = (req, res, next) => {
    // console.log("showZestawElementKomputerList START");
    ZestawElementaKomputeraRepository.getZestawyElementowKomputera()
        .then(z_e_ks => {
            res.render('pages/zestaw_elementa_i_komputera/list',
                {
                    zestaw_elementa_i_komputera: z_e_ks,
                    navLocation: 'zestawElementaKomputera'
                })
        });
}

/*
exports.showAddZestawElementKomputerForm = (req, res, next) => {
    res.render('pages/zestaw_elementa_i_komputera/form',
        {
            zestaw_elementa_i_komputera: {},
            pageTitle: 'Nowy zestaw z elementa i komputera',
            formMode: 'createNew',
            btnLabel: 'Dodaj zestaw z elementa i komputera',
            formAction: '/zestaw_elementa_i_komputera/add',
            navLocation: 'zestawElementaKomputera'
        }); 

}
*/

exports.showEditZestawElementKomputerForm = (req, res, next) => {
    //    // console.log("showEditZestawElementKomputerForm START")
    const zestawId = req.params.zestawId;
    /*
      // console.log("ZestawId");
      // console.log(zestawId);
      */
    let allElements, allKomputers, allZestaws;
    ZestawElementaKomputeraRepository.getZestawyElementowKomputera()
        .then(z_e_ks => {
            allZestaws = z_e_ks;
            return ElementKomputeraRepository.getElements_Komputera();
        })
        .then(elements => {
            allElements = elements;
            return KomputerRepository.getKomputers();
        })
        .then(komps => {
            allKomputers = komps;
            return ZestawElementaKomputeraRepository.getZestawElementaKomputeraById(zestawId);
        })
        .then(z_e_k => {
            res.render('pages/zestaw_elementa_i_komputera/form', { // 'form_special_for_edit'  // form
                allZestaws: allZestaws,
                allKomputers: allKomputers,
                allElements: allElements,
                zestaw_elementa_i_komputera: z_e_k,
                pageTitle: 'Edycja zestaw z elementa i komputera',
                formMode: 'edit',
                btnLabel: 'Edytuj zestaw z elementa i komputera',
                formAction: '/zestaw-komputera-element/edit',
                navLocation: 'zestawElementaKomputera',
                validationErrors: []
            });
        });
};
exports.updateZestawElementKomputer = (req, res, next) => {
    const zestawId = req.body._id;
    const data = { ...req.body };
    /*
    // console.log("Update ZestawElemeKOmp in Controller.\nData:");
    // console.log(data);
    */
    ZestawElementaKomputeraRepository.updateZestawElmentaKomputera(zestawId, data)
        .then(result => {
            res.redirect('/zestaw-komputera-element');
        }).catch(err => {
            let allElements, allKomputers, allZestaws;
            ZestawElementaKomputeraRepository.getZestawyElementowKomputera()
                .then(z_e_ks => {
                    allZestaws = z_e_ks;
                    return ElementKomputeraRepository.getElements_Komputera();
                })
                .then(elements => {
                    allElements = elements;
                    return KomputerRepository.getKomputers();
                })
                .then(komps => {
                    allKomputers = komps;
                });

            //      const newKomputerData = { 'zestaw_elementow_komputera': [], ...komputerData };
            res.render('pages/zestaw_elementa_i_komputera/form', {
                zestaw_elementa_i_komputera: data,
                allZestaws: allZestaws,
                allKomputers: allKomputers,
                allElements: allElements,
                pageTitle: 'Edycja zestaw z elementa i komputera',
                formMode: 'edit',
                btnLabel: 'Edytuj zestaw z elementa i komputera',
                formAction: '/zestaw-komputera-element/edit',
                navLocation: 'zestawElementaKomputera',
                validationErrors: err.details
            });

        });
};


exports.showZestawElementKomputerDetails = (req, res, next) => {
    // // console.log("showZestawElementKomputerDetails START");
    const zestawId = req.params.zestawId;
    let allElems, allKomps;
    ElementKomputeraRepository.getElements_Komputera()
        .then(elements => {
            allElems = elements;
            return KomputerRepository.getKomputers();
        })
        .then(komps => {
            allKomps = komps;
            return ZestawElementaKomputeraRepository.getZestawElementaKomputeraById(zestawId);
        })
        .then(z_e_k => {
            res.render('pages/zestaw_elementa_i_komputera/form',
                {
                    allZestaws: [],
                    zestaw_elementa_i_komputera: z_e_k,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły zestaw z elementą i komputerą',
                    formAction: '',
                    navLocation: 'zestawElementaKomputera',
                    allElements: allElems,
                    allKomputers: allKomps,
                    validationErrors: []
                })
        });
}



exports.showAddZestawElementKomputerForm = (req, res, next) => {
    // // console.log("showAddZestawElementKomputerForm START");
    let allElements, allKomputers, allZestaws;
    ZestawElementaKomputeraRepository.getZestawyElementowKomputera()
        .then(z_e_ks => {
            allZestaws = z_e_ks;
            return ElementKomputeraRepository.getElements_Komputera();
        })
        .then(elements => {
            allElements = elements;
            return KomputerRepository.getKomputers();
        })
        .then(komps => {
            allKomputers = komps;
            res.render('pages/zestaw_elementa_i_komputera/form', {
                zestaw_elementa_i_komputera: {},
                allElements: allElements,
                allKomputers: allKomputers,
                allZestaws: allZestaws,
                formMode: 'createNew',
                pageTitle: 'Nowy zestaw elementa i komputera',
                btnLabel: 'Dodaj zestaw elementa i komputera',
                formAction: '/zestaw-komputera-element/add',
                navLocation: 'zestawElementaKomputera',
                validationErrors: []
            });
        });
}

exports.addZestawElementKomputer = (req, res, next) => {
    const data = { ...req.body };
    ZestawElementaKomputeraRepository.createZestawElementaKomputera(data)
        .then(result => {
            res.redirect('/zestaw-komputera-element');
        }).catch(err => {
            let allElements, allKomputers, allZestaws;
            ZestawElementaKomputeraRepository.getZestawyElementowKomputera()
                .then(z_e_ks => {
                    allZestaws = z_e_ks;
                    return ElementKomputeraRepository.getElements_Komputera();
                })
                .then(elements => {
                    allElements = elements;
                    return KomputerRepository.getKomputers();
                })
                .then(komps => {
                    allKomputers = komps;
                });
            //      const newKomputerData = { 'zestaw_elementow_komputera': [], ...komputerData };
            res.render('pages/zestaw_elementa_i_komputera/form', {
                zestaw_elementa_i_komputera: data,
                allZestaws: allZestaws,
                allKomputers: allKomputers,
                allElements: allElements,
                formMode: 'createNew',
                pageTitle: 'Nowy zestaw elementa i komputera',
                btnLabel: 'Dodaj zestaw elementa i komputera',
                formAction: '/zestaw-komputera-element/add',
                navLocation: 'zestawElementaKomputera',
                validationErrors: err.details
            });

        });
};

// obsługa akcji formularza



exports.deleteZestawElementKomputer = (req, res, next) => {
    const zestawId = req.params.zestawId;
    ZestawElementaKomputeraRepository.deleteZestawElementaKomputera(zestawId)
        .then(() => {
            res.redirect('/zestaw-komputera-element');
        });
};