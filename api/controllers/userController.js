const User = require('../models/user');

class UserController {
  static async listUsers(req, res) {
    try {
      const data = await User.list();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const id = req.params.id;
      const data = await User.getById(id);
      res.json(data);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const { id_usuario, nome, cargo, senha_hash } = req.body;
      if (!id_usuario || !nome || !cargo || !senha_hash) {
        return res.status(400).json({
          error: 'Campos obrigatórios: id_usuario, nome, cargo, senha_hash',
        });
      }

      const data = await User.create({ id_usuario, nome, cargo, senha_hash });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      const data = await User.update(id, req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const result = await User.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
