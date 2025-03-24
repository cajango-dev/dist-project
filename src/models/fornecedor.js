const mongoose = require('mongoose');

const FornecedorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    cnpj: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
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

module.exports = mongoose.model('Fornecedor', FornecedorSchema);