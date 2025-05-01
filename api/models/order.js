const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cliente: { type: String, required: true },
    produtos: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantidade: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    dataPedido: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
