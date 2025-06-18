const { supabase } = require('../supabaseClient');

exports.createOrder = async (req, res) => {
  try {
    let total = 0;
    const produtosAtualizados = [];

    // Valida produtos e atualiza estoque
    for (const item of req.body.produtos) {
      // Busca produto pelo id
      const { data: produto, error: prodError } = await supabase
        .from('product')
        .select('*')
        .eq('id', item.productId)
        .single();

      if (prodError) {
        return res.status(404).json({ error: `Produto ${item.productId} não encontrado` });
      }

      if (produto.estoque < item.quantidade) {
        return res.status(400).json({ error: `Estoque insuficiente para ${produto.nome}` });
      }

      // Atualiza estoque do produto
      const { error: updateError } = await supabase
        .from('product')
        .update({ estoque: produto.estoque - item.quantidade })
        .eq('id', item.productId);

      if (updateError) {
        return res.status(400).json({ error: `Erro ao atualizar estoque do produto ${produto.nome}` });
      }

      total += produto.preco * item.quantidade;
      produtosAtualizados.push({
        productId: item.productId,
        quantidade: item.quantidade
      });
    }

    // Insere pedido
    const { data: orderData, error: orderError } = await supabase
      .from('order')
      .insert([{
        cliente: req.body.cliente,
        produtos: produtosAtualizados,
        total: total
      }])
      .single();

    if (orderError) {
      return res.status(400).json({ error: orderError.message });
    }

    // Atualiza relatório (supondo que tenha só um registro)
    const { data: reportData, error: reportError } = await supabase
      .from('report')
      .select('*')
      .limit(1)
      .single();

    if (reportError && reportError.code !== 'PGRST116') { // PGRST116 = not found
      return res.status(400).json({ error: reportError.message });
    }

    if (!reportData) {
      // Cria novo relatório
      const { error: createReportError } = await supabase
        .from('report')
        .insert([{
          totalVendas: total,
          quantidadePedidos: 1,
          produtosVendidos: produtosAtualizados.map(p => ({
            productId: p.productId,
            quantidadeTotal: p.quantidade
          }))
        }]);
      if (createReportError) {
        return res.status(400).json({ error: createReportError.message });
      }
    } else {
      // Atualiza relatório existente
      // Combina produtosVendidos atuais com os novos produtosAtualizados
      let produtosVendidos = reportData.produtosVendidos || [];

      produtosAtualizados.forEach(item => {
        const prodIndex = produtosVendidos.findIndex(p => p.productId === item.productId);
        if (prodIndex > -1) {
          produtosVendidos[prodIndex].quantidadeTotal += item.quantidade;
        } else {
          produtosVendidos.push({
            productId: item.productId,
            quantidadeTotal: item.quantidade
          });
        }
      });

      const { error: updateReportError } = await supabase
        .from('report')
        .update({
          totalVendas: reportData.totalVendas + total,
          quantidadePedidos: reportData.quantidadePedidos + 1,
          produtosVendidos
        })
        .eq('id', reportData.id);

      if (updateReportError) {
        return res.status(400).json({ error: updateReportError.message });
      }
    }

    res.status(201).json(orderData);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('order')
      .select('*');

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('order')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('order')
      .update(req.body)
      .eq('id', req.params.id)
      .single();

    if (error) return res.status(404).json({ error: 'Pedido não encontrado ou erro ao atualizar' });
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('order')
      .delete()
      .eq('id', req.params.id);

    if (error) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.status(200).json({ message: 'Pedido deletado' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
