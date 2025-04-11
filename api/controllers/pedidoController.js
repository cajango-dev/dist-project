// controllers/pedidoController.js
const Pedido = require('../models/pedido');
const Produto = require('../models/produto');

exports.criarPedido = async (req, res) => {
    try {
        const { cliente, produtos, dataVenda } = req.body;

        let total = 0;

        // Verifica e atualiza o estoque de cada produto
        for (const item of produtos) {
            const produto = await Produto.findById(item.produto);
            if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
            if (produto.quantidadeEstoque < item.quantidade) {
                return res.status(400).json({ message: `Estoque insuficiente para o produto ${produto.nome}` });
            }
            produto.quantidadeEstoque -= item.quantidade;
            await produto.save();
            total += produto.precoVenda * item.quantidade;
        }

        const novoPedido = new Pedido({
            cliente,
            produtos,
            total,
            dataVenda: dataVenda || new Date(),
        });

        await novoPedido.save();
        res.status(201).json(novoPedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar pedido' });
    }
};

exports.listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('produtos.produto');
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
};
