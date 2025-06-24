const Stock = require('../models/stock');

class StockController {
    static async listStock(req, res) {
        try {
            const data = await Stock.list();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getStockById(req, res) {
        try {
            const id = Number(req.params.id);
            const data = await Stock.getById(id);
            res.json(data);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async createStockEntry(req, res) {
        try {
            const { id_produto, quantidade, data_movimentacao, tipo_movimentacao } = req.body;
            if (!id_produto || !quantidade || !tipo_movimentacao) {
                return res.status(400).json({ error: 'Campos obrigatórios: id_produto, quantidade, tipo_movimentacao' });
            }

            const data = await Stock.create({ id_produto, quantidade, data_movimentacao, tipo_movimentacao });
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteStock(req, res) {
        try {
            const id = Number(req.params.id);
            const result = await Stock.delete(id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = StockController;
