const express = require('express');
const router = express.Router();

const elementKomputeraController = require('../controllers/elementKomputeraController');

router.get('/', elementKomputeraController.showElementKomputerList);
router.get('/add', elementKomputeraController.showAddElementKomputerForm);
router.get('/edit/:elementId', elementKomputeraController.showEditElementKomputerowyForm);
router.get('/details/:elementId', elementKomputeraController.showElementKomputerDetails);

router.post('/add', elementKomputeraController.addElementKomputera);
router.post('/edit', elementKomputeraController.updateElementKomputera);
router.get('/delete/:elementId', elementKomputeraController.deleteElementKomputera);

module.exports = router;