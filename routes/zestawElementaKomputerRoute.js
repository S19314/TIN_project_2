const express = require('express');
const router = express.Router();

const komputerController = require('../controllers/zestawElementaKomputeraController');

router.get('/', komputerController.showKomputerList);
router.get('/add', komputerController.showAddKomputerForm);
router.get('/details/:komputerId', komputerController.showKomputerDetails);

module.exports = router;