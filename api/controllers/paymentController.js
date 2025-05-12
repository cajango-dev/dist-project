const Payment = require('../models/payment');
const Order = require('../models/order');

exports.createPayment = async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();

        // Se o pagamento foi concluído, atualiza status do pedido
        if (payment.status === 'concluido') {
            const order = await Order.findById(payment.orderId);
            if (order) {
                order.status = 'pago';
                await order.save();
            }
        }

        res.status(201).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Função para pegar todos os pagamentos
exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Função para pegar um pagamento por ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
        res.status(200).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Função para atualizar um pagamento
exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
        res.status(200).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Função para deletar um pagamento
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
        res.status(200).json({ message: 'Pagamento deletado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
