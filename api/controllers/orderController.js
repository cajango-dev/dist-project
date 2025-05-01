const Order = require('../models/order');
const Product = require('../models/product');
const Report = require('../models/report');

exports.createOrder = async (req, res) => {
    try {
        let total = 0;
        const produtosAtualizados = [];

        for (const item of req.body.produtos) {
            const produto = await Product.findById(item.productId);
            if (!produto) {
                return res.status(404).json({ error: `Produto ${item.productId} não encontrado` });
            }
            if (produto.estoque < item.quantidade) {
                return res.status(400).json({ error: `Estoque insuficiente para ${produto.nome}` });
            }

            produto.estoque -= item.quantidade;
            await produto.save();

            total += produto.preco * item.quantidade;
            produtosAtualizados.push({
                productId: produto._id,
                quantidade: item.quantidade
            });
        }

        const order = new Order({
            cliente: req.body.cliente,
            produtos: produtosAtualizados,
            total: total
        });

        await order.save();

        // Atualizar relatório
        let report = await Report.findOne();
        if (!report) {
            report = new Report();
        }

        report.totalVendas += total;
        report.quantidadePedidos += 1;

        for (const item of produtosAtualizados) {
            const existingProduct = report.produtosVendidos.find(p => p.productId.equals(item.productId));
            if (existingProduct) {
                existingProduct.quantidadeTotal += item.quantidade;
            } else {
                report.produtosVendidos.push({
                    productId: item.productId,
                    quantidadeTotal: item.quantidade
                });
            }
        }

        await report.save();

        res.status(201).json(order);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('produtos.productId', 'nome preco');
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('produtos.productId', 'nome preco');
        if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
        res.status(200).json({ message: 'Pedido deletado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
