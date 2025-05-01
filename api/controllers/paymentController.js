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
