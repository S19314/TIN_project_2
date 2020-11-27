const express = require('express');
const router = express.Router();

const komputerController = require('../controllers/komputerController');

router.get('/', komputerController.showKomputerList);
router.get('/add', komputerController.showAddKomputerForm);
router.get('/details/:komputerId', komputerController.showKomputerDetails);

module.exports = router;