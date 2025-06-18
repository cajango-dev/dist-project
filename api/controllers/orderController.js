const Order = require('../models/order');

class OrderController {
  static async listOrders(req, res) {
    try {
      const data = await Order.list();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createOrder(req, res) {
    try {
      const data = await Order.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrderById(req, res) {
    try {
      const data = await Order.getById(Number(req.params.id));
      res.json(data);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async addProductToOrder(req, res) {
    try {
      const data = await Order.addProductToOrder(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listOrderProducts(req, res) {
    try {
      const data = await Order.listProducts(Number(req.params.id));
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrderController;
