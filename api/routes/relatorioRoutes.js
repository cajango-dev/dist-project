const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

/**
 * @swagger
 * /relatorios/mais-vendidos:
 *   get:
 *     summary: Obter os produtos mais vendidos
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: Lista de produtos mais vendidos
 */
router.get('/mais-vendidos', relatorioController.produtosMaisVendidos);

/**
 * @swagger
 * /relatorios/vendas:
 *   get:
 *     summary: Obter vendas por período
 *     tags: [Relatórios]
 *     parameters:
 *       - name: inicio
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: "2025-04-01"
 *       - name: fim
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: "2025-04-07"
 *     responses:
 *       200:
 *         description: Total e pedidos por período
 */
router.get('/vendas', relatorioController.vendasPorPeriodo);

module.exports = router;
