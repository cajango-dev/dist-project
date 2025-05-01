const Transaction = require('../models/Transaction');
const Product = require('../models/Product'); // Modelo de produtos

// Registrar compra (entrada no estoque)
exports.registerPurchase = async (req, res) => {
  try {
    const { productId, quantity, unitPrice, supplier } = req.body;

    // 1. Cria a transação
    const transaction = await Transaction.create({
      type: 'purchase',
      productId,
      quantity,
      unitPrice,
      supplier,
      total: quantity * unitPrice,
    });

    // 2. Atualiza o estoque do produto (+quantidade)
    await Product.findByIdAndUpdate(productId, { $inc: { stock: quantity } });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar compra' });
  }
};

// Registrar venda (saída do estoque)
exports.registerSale = async (req, res) => {
  try {
    const { productId, quantity, unitPrice, client } = req.body;

    // 1. Cria a transação
    const transaction = await Transaction.create({
      type: 'sale',
      productId,
      quantity,
      unitPrice,
      client,
      total: quantity * unitPrice,
    });

    // 2. Atualiza o estoque do produto (-quantidade)
    await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar venda' });
  }
};

// Outros métodos (histórico, buscar por ID)...