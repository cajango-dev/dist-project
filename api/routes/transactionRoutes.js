const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Middlewares (ex: autenticação)
const { authMiddleware, ensureStock } = require('../middlewares');

// Rotas de Compra/Venda
router.post('/purchase', authMiddleware, ensureStock, transactionController.registerPurchase);
router.post('/sale', authMiddleware, ensureStock, transactionController.registerSale);
router.get('/history', authMiddleware, transactionController.getTransactionHistory);
router.get('/:id', authMiddleware, transactionController.getTransactionById);

module.exports = router;