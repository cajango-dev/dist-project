const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Ativo', 'Inativo'],
    required: true
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
