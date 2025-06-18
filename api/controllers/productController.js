const { supabase } = require('../supabaseClient');

// Criar produto
exports.createProduct = async (req, res) => {
  try {
    const produtos = Array.isArray(req.body) ? req.body : [req.body];

    for (const produto of produtos) {
      if (!produto.nome || produto.preco == null || produto.quantidade_estoque == null || !produto.id_fornecedor) {
        return res.status(400).json({ message: 'Campos obrigatórios: nome, preco, quantidade_estoque, id_fornecedor' });
      }
    }

    const { data, error } = await supabase
      .from('produto')
      .insert(produtos)
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Produtos criados com sucesso', data });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
  }
};

// Buscar todos os produtos
exports.getProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('produto')
      .select('id_produto, nome, preco, quantidade_estoque, id_fornecedor');

    if (error) {
      throw error;
    }

    // Adaptar estrutura para o frontend
    const produtosAdaptados = data.map(p => ({
      id: p.id_produto,
      nome: p.nome,
      preco: parseFloat(p.preco),
      estoque: p.quantidade_estoque,
      categoria: "Outros" // Temporário até adicionar categoria no banco
    }));

    res.status(200).json(produtosAdaptados);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno ao buscar produtos', error: error.message });
  }
};

// Buscar produto por id
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const { data, error } = await supabase
      .from('produto')
      .select('*')
      .eq('id_produto', id)
      .single();

    if (error) return res.status(404).json({ error: 'Produto não encontrado' });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Atualizar produto (corrigido: sem categoria)
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, preco, estoque, id_fornecedor } = req.body;

    const updates = {};

    if (nome !== undefined) updates.nome = nome;
    if (preco !== undefined) updates.preco = preco;
    if (estoque !== undefined) updates.quantidade_estoque = estoque;
    if (id_fornecedor !== undefined) updates.id_fornecedor = id_fornecedor;

    const { data, error } = await supabase
      .from('produto')
      .update(updates)
      .eq('id_produto', id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Produto atualizado', data });
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Deletar produto
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const { data, error } = await supabase
      .from('produto')
      .delete()
      .eq('id_produto', id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Produto deletado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
