const Supplier = require('../models/supplier');

class SupplierController {
  static async listSuppliers(req, res) {
    try {
      const data = await Supplier.list();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getSupplierById(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const data = await Supplier.getById(id);
      res.json(data);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async createSupplier(req, res) {
    try {
      const { nome, email, telefone, cnpj } = req.body;
      if (!nome) return res.status(400).json({ error: 'Campo nome é obrigatório' });

      const data = await Supplier.create({ nome, email, telefone, cnpj });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateSupplier(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const data = await Supplier.update(id, req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteSupplier(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const result = await Supplier.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SupplierController;
