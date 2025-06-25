const Report = require('../models/report');

/* exports.getReport = async (req, res) => {
    try {
        const report = await Report.findOne().populate('produtosVendidos.productId', 'nome');
        res.status(200).json(report);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
 */

const { supabase } = require('../supabaseClient');

exports.getReport = async (req, res) => {
  try {
    // 1. Total de vendas e quantidade de pedidos
    const { data: pedidosData, error: pedidosError } = await supabase
      .from('pedido')
      .select('total', { count: 'exact' });

    if (pedidosError) return res.status(500).json({ error: pedidosError.message });

    const totalVendas = pedidosData.reduce((acc, p) => acc + Number(p.total), 0) || 0;

    const quantidadePedidos = pedidosData.length;

    // 2. Quantidade total vendida por produto (join com produto e venda_produto)
    // Como Supabase não suporta join direto, faremos duas queries e juntamos no backend

    // Buscar venda_produto agregando quantidade por produto
    const { data: vendasProdutos, error: vendasError } = await supabase
      .from('venda_produto')
      .select('id_produto, quantidade');

    if (vendasError) return res.status(500).json({ error: vendasError.message });

    // Agregar quantidade vendida por produto
    const quantidadePorProduto = {};
    vendasProdutos.forEach(item => {
      if (!quantidadePorProduto[item.id_produto]) {
        quantidadePorProduto[item.id_produto] = 0;
      }
      quantidadePorProduto[item.id_produto] += item.quantidade;
    });

    // Buscar produtos para obter nomes
    const idsProdutos = Object.keys(quantidadePorProduto);
    let produtos = [];
    if (idsProdutos.length > 0) {
      const { data: produtosData, error: produtosError } = await supabase
        .from('produto')
        .select('id_produto, nome')
        .in('id_produto', idsProdutos);

      if (produtosError) return res.status(500).json({ error: produtosError.message });

      produtos = produtosData.map(prod => ({
        id_produto: prod.id_produto,
        nome: prod.nome,
        quantidadeVendida: quantidadePorProduto[prod.id_produto] || 0
      }));
    }

    const report = {
      totalVendas,
      quantidadePedidos,
      produtosVendidos: produtos
    };

    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
