const { supabase } = require('../supabaseClient');

class Report {
    static async generate() {
        // 1. Buscar todos os pedidos com o campo "total"
        const { data: pedidosData, error: pedidosError } = await supabase
            .from('pedido')
            .select('total');

        if (pedidosError) throw new Error(pedidosError.message);

        const totalVendas = pedidosData.reduce((acc, p) => acc + Number(p.total), 0) || 0;
        const quantidadePedidos = pedidosData.length;

        // 2. Buscar vendas agregadas por produto
        const { data: vendasProdutos, error: vendasError } = await supabase
            .from('venda_produto')
            .select('id_produto, quantidade');

        if (vendasError) throw new Error(vendasError.message);

        const quantidadePorProduto = {};
        vendasProdutos.forEach(item => {
            if (!quantidadePorProduto[item.id_produto]) {
                quantidadePorProduto[item.id_produto] = 0;
            }
            quantidadePorProduto[item.id_produto] += item.quantidade;
        });

        // 3. Buscar os nomes dos produtos
        const idsProdutos = Object.keys(quantidadePorProduto);

        let produtos = [];
        if (idsProdutos.length > 0) {
            const { data: produtosData, error: produtosError } = await supabase
                .from('produto')
                .select('id_produto, nome')
                .in('id_produto', idsProdutos);

            if (produtosError) throw new Error(produtosError.message);

            produtos = produtosData.map(prod => ({
                id_produto: prod.id_produto,
                nome: prod.nome,
                quantidadeVendida: quantidadePorProduto[prod.id_produto] || 0
            }));
        }

        return {
            totalVendas,
            quantidadePedidos,
            produtosVendidos: produtos
        };
    }
}

module.exports = Report;
