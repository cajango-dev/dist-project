// models/Pedido.js
const mongoose = require('mongoose');

const ItemPedidoSchema = new mongoose.Schema({
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true }
});

const PedidoSchema = new mongoose.Schema({
    cliente: { type: String, required: true },
    itens: [ItemPedidoSchema],
    total: { type: Number, required: true },
    dataVenda: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);


// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const Produto = require('../models/produto.js');

// Criar novo pedido
router.post('/', async (req, res) => {
    try {
        const { cliente, itens } = req.body;
        let total = 0;

        for (let item of itens) {
            const produto = await Produto.findById(item.produto);
            if (!produto) return res.status(404).json({ message: `Produto ${item.produto} não encontrado` });

            if (produto.quantidadeEstoque < item.quantidade) {
                return res.status(400).json({ message: `Estoque insuficiente para o produto ${produto.nome}` });
            }

            produto.quantidadeEstoque -= item.quantidade;
            await produto.save();

            total += produto.precoVenda * item.quantidade;
        }

        const novoPedido = new Pedido({ cliente, itens, total });
        await novoPedido.save();
        res.status(201).json(novoPedido);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Relatório: produtos mais vendidos
router.get('/relatorios/produtos-mais-vendidos', async (req, res) => {
    try {
        const result = await Pedido.aggregate([
            { $unwind: "$itens" },
            { $group: {
                _id: "$itens.produto",
                totalVendido: { $sum: "$itens.quantidade" }
            }},
            { $sort: { totalVendido: -1 } },
            { $limit: 10 },
            { $lookup: {
                from: 'produtos',
                localField: '_id',
                foreignField: '_id',
                as: 'produto'
            }},
            { $unwind: "$produto" }
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Relatório: total de vendas por período
router.get('/relatorios/vendas-por-periodo', async (req, res) => {
    const { inicio, fim } = req.query;

    try {
        const vendas = await Pedido.find({
            dataVenda: {
                $gte: new Date(inicio),
                $lte: new Date(fim)
            }
        });

        const total = vendas.reduce((acc, venda) => acc + venda.total, 0);

        res.json({ totalVendas: total, vendas });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;


// app.js (adição)
const pedidoRoutes = require('./routes/pedidoRoutes');
app.use('/api/pedidos', pedidoRoutes);
