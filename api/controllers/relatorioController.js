const Pedido = require('../models/pedido');
const Produto = require('../models/produto');

exports.produtosMaisVendidos = async (req, res) => {
    try {
        const resultado = await Pedido.aggregate([
            { $unwind: '$produtos' },
            {
                $group: {
                    _id: '$produtos.produto',
                    quantidade: { $sum: '$produtos.quantidade' }
                }
            },
            { $sort: { quantidade: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'produtos',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'produto'
                }
            },
            { $unwind: '$produto' },
            {
                $project: {
                    nome: '$produto.nome',
                    quantidade: 1
                }
            }
        ]);
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.vendasPorPeriodo = async (req, res) => {
    try {
        const { inicio, fim } = req.query;
        const vendas = await Pedido.find({
            data: {
                $gte: new Date(inicio),
                $lte: new Date(fim)
            }
        });
        const total = vendas.reduce((sum, pedido) => sum + pedido.total, 0);
        res.json({ total, pedidos: vendas });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
