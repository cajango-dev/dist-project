const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

// GET - Listar todos os pagamentos
router.get('/', PaymentController.listPayments);

// GET - Obter pagamento por ID
router.get('/:id', PaymentController.getPaymentById);

// POST - Criar um novo pagamento
router.post('/', PaymentController.createPayment);

// DELETE - Remover um pagamento
router.delete('/:id', PaymentController.deletePayment);

module.exports = router;
