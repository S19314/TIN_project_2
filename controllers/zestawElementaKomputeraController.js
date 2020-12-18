const e = require('express');
const ZestawElementaKomputeraRepository = require('../repository/mysql2/ZestawElementaKomputeraRepository');
const KomputerRepository = require('../repository/mysql2/KomputerRepository');
const ElementKomputeraRepository = require('../repository/mysql2/ElementKomputeraRepository');

exports.showZestawElementKomputerList = (req, res, next) => {
    ZestawElementaKomputeraRepository.getZestawyElementowKomputera()
        .then(z_e_ks => {
            res.render('pages/zestaw_elementa_i_komputera/list',
                {
                    zestaw_elementa_i_komputera: z_e_ks,
                    navLocation: 'zestawElementaKomputera'
                })

        });

}

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

exports.showEditEmployeeForm = (req, res, next) => {
    const zestawId = req.params.zestawId;
    ZestawElementaKomputeraRepository.getZestawElementaKomputeraById(zestawId)
        .then(z_e_k => {
            res.render('pages/zestaw_elementa_i_komputera/form', {
                zestaw_elementa_i_komputera: z_e_k,
                pageTitle: 'Edycja zestaw z elementa i komputera',
                formMode: 'edit',
                btnLabel: 'Edytuj zestaw z elementa i komputera',
                formAction: '/zestaw_elementa_i_komputera/edit',
                navLocation: 'zestawElementaKomputera'
            });
        });
};

exports.showZestawElementKomputerDetails = (req, res, next) => {
    const zestawId = req.params.zestawId;
    ZestawElementaKomputeraRepository.getZestawElementaKomputeraById(zestawId)
        .then(z_e_k => {
            res.render('pages/zestaw_elementa_i_komputera/form',
                {
                    zestaw_elementa_i_komputera: z_e_k,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły zestaw z elementą i komputerą',
                    formAction: '',
                    navLocation: 'zestawElementaKomputera'
                })
        })
        ;
}


exports.showAddZestawElementKomputerForm = (req, res, next) => {
    let allElements, allKomputers;
    ElementKomputeraRepository.getElements_Komputera()
        .then(elements => {
            allElements = elements;
            return KomputerRepository.getKomputers();
        })
        .then(komps => {
            allKomputers = komps;
            res.render('pages/zestaw_elementa_i_komputera/form', {
                zestaw_elementa_i_komputera: {},
                formMode: 'createNew',
                allElements: allElements,
                allKomputers: allKomputers,
                pageTitle: 'Nowy zestaw elementa i komputera',
                btnLabel: 'Dodaj zestaw elementa i komputera',
                formAction: '/zestaw-komputera-element/add',
                navLocation: 'zestawElementaKomputera'
            });
        });
}