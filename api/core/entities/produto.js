const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String
    },
    precoCompra: {
        type: Number,
        required: true,
        min: 0
    },
    precoVenda: {
        type: Number,
        required: true,
        min: 0
    },
    quantidadeEstoque: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    fornecedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fornecedor',
        required: true
    },
    categoria: {
        type: String,
        enum: ['Alcoólico', 'Não Alcoólico', 'Energético', 'Outros'],
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    ativo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Produto', ProdutoSchema);