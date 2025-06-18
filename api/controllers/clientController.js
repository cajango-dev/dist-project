const Client = require('../models/client');

class ClientController {
    static async listClients(req, res) {
        try {
            const data = await Client.list();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createClient(req, res) {
        try {
            const { nome, email, status, cpf, telefone } = req.body;
            if (!nome || !email || !status) {
                return res.status(400).json({ error: 'Campos obrigatórios: nome, email, status' });
            }
            const data = await Client.create({ nome, email, status, cpf, telefone });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateClient(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

            const data = await Client.update(id, req.body);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteClient(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

            const result = await Client.delete(id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ClientController;
