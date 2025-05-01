const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    contato: { type: String },
    email: { type: String },
    endereco: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
