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
    res.render('pages/zestaw_elementa_i_komputera/form', {});

    /* 
    zestaw_elementa_i_komputera: {},
            pageTitle: 'Nowy pracownik',
            formMode: 'createNew',
            btnLabel: 'Dodaj pracownika',
            formAction: '/employees/add',
            navLocation: 'zestawElementaKomputera'
    */
}


exports.showZestawElementKomputerDetails = (req, res, next) => {
    res.render('pages/zestaw_elementa_i_komputera/zestaw-elementow-komputera-szegoly', {});
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