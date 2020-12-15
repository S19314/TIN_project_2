const express = require('express');
const router = express.Router();

const zestawApiController = require('../../api/Zestaw_elementa_i_komputeraAPI');

router.get('/', zestawApiController.getZestawyElementowKomputera);
router.get('/:zestawId', zestawApiController.getZestawyElementowKomputeraById);
router.post('/', zestawApiController.createZestawElementaKomputera);
router.put('/:zestawId', zestawApiController.updateZestawElementaKomputera);
router.delete('/:zestawId', zestawApiController.deleteZestawElementaKomputera);

module.exports = router;