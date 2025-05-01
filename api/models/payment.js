const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    valorPago: { type: Number, required: true },
    metodo: { type: String, enum: ['dinheiro', 'cartao', 'pix'], required: true },
    dataPagamento: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
