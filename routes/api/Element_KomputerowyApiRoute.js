const express = require('express');
const router = express.Router();

const elementApiController = require('../../api/Element_komputerowyAPI');

router.get('/', elementApiController.getElements_Komputera);
router.get('/:elementId', elementApiController.getElement_KomputeraById);
router.post('/', elementApiController.createElement_Komputera);
router.put('/:elementId', elementApiController.updateElement_Komputera);
router.delete('/:elementId', elementApiController.deleteElement_Komputera);

module.exports = router;