const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    telefone: { type: String },
    email: { type: String }
});

module.exports = mongoose.model('Supplier', supplierSchema);
