const express = require('express');
const router = express.Router();

const elementKomputeraController = require('../controllers/elementKomputeraController');

router.get('/', elementKomputeraController.showElementKomputerList);
router.get('/add', elementKomputeraController.showAddElementKomputerForm);
router.get('/details/:elementKomputeraId', elementKomputeraController.showElementKomputerDetails);

module.exports = router;