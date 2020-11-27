const express = require('express');
const router = express.Router();

const zestawElementaKomputeraController = require('../controllers/zestawElementaKomputeraController');

router.get('/', zestawElementaKomputeraController.showZestawElementKomputerList);
router.get('/add', zestawElementaKomputeraController.showAddZestawElementKomputerForm);
router.get('/details/:komputerId', zestawElementaKomputeraController.showZestawElementKomputerDetails);

module.exports = router;