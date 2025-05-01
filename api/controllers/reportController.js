const Report = require('../models/report');

exports.getReport = async (req, res) => {
    try {
        const report = await Report.findOne().populate('produtosVendidos.productId', 'nome');
        res.status(200).json(report);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
