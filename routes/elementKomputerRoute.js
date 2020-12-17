const express = require('express');
const router = express.Router();

const elementKomputeraController = require('../controllers/elementKomputeraController');

router.get('/', elementKomputeraController.showElementKomputerList);
router.get('/add', elementKomputeraController.showAddElementKomputerForm);
router.get('/edit/:elementId', elementKomputeraController.showEditElementKomputerowyForm);
router.get('/details/:elementId', elementKomputeraController.showElementKomputerDetails);

module.exports = router;