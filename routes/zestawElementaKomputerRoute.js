const express = require('express');
const router = express.Router();

const zestawElementaKomputeraController = require('../controllers/zestawElementaKomputeraController');

router.get('/', zestawElementaKomputeraController.showZestawElementKomputerList);
router.get('/add', zestawElementaKomputeraController.showAddZestawElementKomputerForm);
router.get('/edit/:zestawId', zestawElementaKomputeraController.showEditZestawElementKomputerForm);
router.get('/details/:zestawId', zestawElementaKomputeraController.showZestawElementKomputerDetails);

router.post('/add', zestawElementaKomputeraController.addZestawElementKomputer);
router.post('/edit', zestawElementaKomputeraController.updateZestawElementKomputer);
router.get('/delete/:zestawId', zestawElementaKomputeraController.deleteZestawElementKomputer);

module.exports = router;