const { supabase } = require('../supabaseClient');

exports.createPayment = async (req, res) => {
  try {
    const paymentData = req.body;

    // Insere o pagamento
    const { data: payment, error: paymentError } = await supabase
      .from('payment')
      .insert([paymentData])
      .single();

    if (paymentError) {
      return res.status(400).json({ error: paymentError.message });
    }

    // Se o pagamento foi concluído, atualiza status do pedido
    if (payment.status === 'concluido') {
      const { data: order, error: orderError } = await supabase
        .from('order')
        .select('*')
        .eq('id', payment.orderId)
        .single();

      if (!order || orderError) {
        // Pode apenas ignorar se pedido não encontrado
        console.warn('Pedido não encontrado para atualizar status');
      } else {
        // Atualiza o status do pedido para "pago"
        const { error: updateOrderError } = await supabase
          .from('order')
          .update({ status: 'pago' })
          .eq('id', payment.orderId);

        if (updateOrderError) {
          console.warn('Erro ao atualizar status do pedido:', updateOrderError.message);
        }
      }
    }

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const { data, error } = await supabase.from('payment').select('*');

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('payment')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) return res.status(404).json({ error: 'Pagamento não encontrado' });
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('payment')
      .update(req.body)
      .eq('id', req.params.id)
      .single();

    if (error) return res.status(404).json({ error: 'Pagamento não encontrado ou erro ao atualizar' });
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('payment')
      .delete()
      .eq('id', req.params.id);

    if (error) return res.status(404).json({ error: 'Pagamento não encontrado' });
    res.status(200).json({ message: 'Pagamento deletado' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
