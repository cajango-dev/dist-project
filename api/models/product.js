const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    preco: { type: Number, required: true },
    estoque: { type: Number, required: true },
    fornecedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
