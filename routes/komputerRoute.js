const express = require('express');
const router = express.Router();

const komputerController = require('../controllers/komputerController');

router.get('/', komputerController.showKomputerList);
router.get('/add', komputerController.showAddKomputerForm);
router.get('/edit/:komputerId', komputerController.showEditKomputerForm);
router.get('/details/:komputerId', komputerController.showKomputerDetails);

router.post('/add', komputerController.addKomputer);
router.post('/edit', komputerController.updateKomputer);
router.get('/delete/:komputerId', komputerController.deleteKomputer);

module.exports = router;






