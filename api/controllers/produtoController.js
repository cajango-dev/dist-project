const Produto = require('../models/produto');

// Criar produto
exports.criarProduto = async (req, res) => {
    try {
        const novoProduto = new Produto(req.body);
        await novoProduto.save();
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find().populate('fornecedor');
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter produto por ID
exports.obterProduto = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id).populate('fornecedor');
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar produto
exports.atualizarProduto = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Deletar produto
exports.deletarProduto = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};