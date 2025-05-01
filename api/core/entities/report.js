const mongoose = require('mongoose');

const productSummarySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantidadeTotal: { type: Number, default: 0 }
});

const reportSchema = new mongoose.Schema({
    totalVendas: { type: Number, default: 0 },
    quantidadePedidos: { type: Number, default: 0 },
    produtosVendidos: [productSummarySchema]
});

module.exports = mongoose.model('Report', reportSchema);
