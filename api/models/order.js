const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cliente: { type: String, required: true },
    produtos: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantidade: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pendente', 'pago', 'cancelado'], default: 'pendente' },
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
