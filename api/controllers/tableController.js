const Table = require('../models/table');

class TableController {
    static async listTables(req, res) {
        try {
            const data = await Table.list();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getTableById(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

            const data = await Table.getById(id);
            res.json(data);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async createTable(req, res) {
        try {
            const { numero, status, qtd_pessoas } = req.body;
            if (!numero || !status) {
                return res.status(400).json({ error: 'Campos obrigatórios: numero, status' });
            }

            const data = await Table.create({ numero, status, qtd_pessoas });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateTable(req, res) {
        try {
            const id = Number(req.params.id);
            const data = await Table.update(id, req.body);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteTable(req, res) {
        try {
            const id = Number(req.params.id);
            const result = await Table.delete(id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TableController;
