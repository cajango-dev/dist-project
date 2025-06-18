const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// GET - Lista todos os pedidos
router.get('/', OrderController.listOrders);

// GET - Obter pedido por ID
router.get('/:id', OrderController.getOrderById);

// POST - Criar um novo pedido
router.post('/', OrderController.createOrder);

// POST - Adicionar produto ao pedido
router.post('/:id/produtos', OrderController.addProductToOrder);

// GET - Listar produtos de um pedido
router.get('/:id/produtos', OrderController.listOrderProducts);

module.exports = router;
