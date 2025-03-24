const Fornecedor = require('../models/fornecedor');

// Criar fornecedor
exports.criarFornecedor = async (req, res) => {
    try {
        const novoFornecedor = new Fornecedor(req.body);
        await novoFornecedor.save();
        res.status(201).json(novoFornecedor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Listar todos os fornecedores
exports.listarFornecedores = async (req, res) => {
    try {
        const fornecedores = await Fornecedor.find();
        res.json(fornecedores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter fornecedor por ID
exports.obterFornecedor = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findById(req.params.id);
        if (!fornecedor) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.json(fornecedor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar fornecedor
exports.atualizarFornecedor = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!fornecedor) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.json(fornecedor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Deletar fornecedor
exports.deletarFornecedor = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByIdAndDelete(req.params.id);
        if (!fornecedor) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.json({ message: 'Fornecedor deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};