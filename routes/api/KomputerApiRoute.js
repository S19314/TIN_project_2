const express = require('express');
const router = express.Router();

const computerApiController = require('../../api/KomputerAPI');

router.get('/', computerApiController.getKomputers);
router.get('/:computerId', computerApiController.getKomputerById);
router.post('/', computerApiController.createKomputer);
router.put('/:computerId', computerApiController.updateKomputer);
router.delete('/:computerId', computerApiController.deleteKomputer);

module.exports = router;