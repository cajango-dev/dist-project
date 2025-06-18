const Payment = require('../models/payment');

class PaymentController {
  static async listPayments(req, res) {
    try {
      const data = await Payment.list();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPaymentById(req, res) {
    try {
      const id = Number(req.params.id);
      const data = await Payment.getById(id);
      res.json(data);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async createPayment(req, res) {
    try {
      const data = await Payment.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deletePayment(req, res) {
    try {
      const id = Number(req.params.id);
      const result = await Payment.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;
