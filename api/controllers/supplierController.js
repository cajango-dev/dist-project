const { supabase } = require('../supabaseClient');

// Criar fornecedor
exports.createSupplier = async (req, res) => {
  try {
    const { nome, cnpj } = req.body;

    if (!nome || !cnpj) {
      return res.status(400).json({ message: 'Nome e CNPJ são obrigatórios' });
    }

    // Verifica se CNPJ já existe
    const { data: existing, error: findError } = await supabase
      .from('fornecedor')
      .select('id_fornecedor')
      .eq('cnpj', cnpj)
      .single();

    if (findError === null && existing) {
      return res.status(409).json({ message: 'CNPJ já cadastrado' });
    }

    const { data, error } = await supabase
      .from('fornecedor')
      .insert([{ nome, cnpj }])
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Erro ao criar fornecedor:', error);
    res.status(500).json({ message: 'Erro interno ao criar fornecedor', error: error.message });
  }
};

// Buscar todos os fornecedores
exports.getSuppliers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('fornecedor')
      .select('*');

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar fornecedores:', error);
    res.status(500).json({ message: 'Erro interno ao buscar fornecedores', error: error.message });
  }
};

// Buscar fornecedor por ID
exports.getSupplierById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { data, error } = await supabase
      .from('fornecedor')
      .select('*')
      .eq('id_fornecedor', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
      }
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar fornecedor por ID:', error);
    res.status(500).json({ message: 'Erro interno ao buscar fornecedor', error: error.message });
  }
};

// Atualizar fornecedor
exports.updateSupplier = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, cnpj } = req.body;

    if (!nome || !cnpj) {
      return res.status(400).json({ message: 'Nome e CNPJ são obrigatórios' });
    }

    // Verifica se o CNPJ está em uso por outro fornecedor
    const { data: existing, error: findError } = await supabase
      .from('fornecedor')
      .select('id_fornecedor')
      .eq('cnpj', cnpj)
      .neq('id_fornecedor', id)
      .single();

    if (findError === null && existing) {
      return res.status(409).json({ message: 'CNPJ já cadastrado por outro fornecedor' });
    }

    const { data, error } = await supabase
      .from('fornecedor')
      .update({ nome, cnpj })
      .eq('id_fornecedor', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ message: 'Fornecedor não encontrado' });
      }
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao atualizar fornecedor:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar fornecedor', error: error.message });
  }
};

// Deletar fornecedor
exports.deleteSupplier = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { error } = await supabase
      .from('fornecedor')
      .delete()
      .eq('id_fornecedor', id);

    if (error) throw error;

    res.status(200).json({ message: 'Fornecedor deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar fornecedor:', error);
    res.status(500).json({ message: 'Erro interno ao deletar fornecedor', error: error.message });
  }
};
