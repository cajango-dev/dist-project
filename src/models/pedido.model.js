const mongoose = require('mongoose');

const ItemPedidoSchema = new mongoose.Schema({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        required: true
    },
    quantidade: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });

const PedidoSchema = new mongoose.Schema({
    cliente: {
        type: String,
        required: true
    },
    itens: {
        type: [ItemPedidoSchema],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    dataVenda: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
