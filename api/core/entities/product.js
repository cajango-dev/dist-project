const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    categoria: { type: String },
    preco: { type: Number, required: true },
    estoque: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
