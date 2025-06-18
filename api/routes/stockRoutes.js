const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stockController');

router.get('/', StockController.listStock);
router.get('/:id', StockController.getStockById);
router.post('/', StockController.createStockEntry);
router.delete('/:id', StockController.deleteStock);

module.exports = router;
