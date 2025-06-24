const Product = require('../models/product');

class ProductController {
  static async listProducts(req, res) {
    try {
      const data = await Product.list();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const data = await Product.getById(id);
      res.json(data);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const { nome, descricao, preco, quantidade_estoque, id_fornecedor } = req.body;
      if (!nome || preco === undefined) {
        return res.status(400).json({ error: 'Campos obrigatórios: nome, preco' });
      }
      const data = await Product.create({ nome, descricao, preco, quantidade_estoque, id_fornecedor });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const data = await Product.update(id, req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const result = await Product.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
