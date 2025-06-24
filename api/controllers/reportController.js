const Report = require('../models/report');

exports.getReport = async (req, res) => {
  try {
    const report = await Report.generate();
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Erro interno do servidor' });
  }
};
