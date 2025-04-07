const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  dataVenda: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
    quantidade: { type: Number, required: true },
    precoUnitario: { type: Number, required: true }
  }]
});

module.exports = mongoose.model("Pedido", PedidoSchema);
