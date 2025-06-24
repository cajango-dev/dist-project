const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/supplierController');

router.get('/', SupplierController.listSuppliers);
router.get('/:id', SupplierController.getSupplierById);
router.post('/', SupplierController.createSupplier);
router.put('/:id', SupplierController.updateSupplier);
router.delete('/:id', SupplierController.deleteSupplier);

module.exports = router;
