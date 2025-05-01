const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    valor: { type: Number, required: true },
    formaPagamento: { type: String, enum: ['dinheiro', 'cartao', 'pix'], required: true },
    dataPagamento: { type: Date, default: Date.now },
    status: { type: String, enum: ['pendente', 'concluido', 'falhou'], default: 'pendente' }
});

module.exports = mongoose.model('Payment', paymentSchema);
