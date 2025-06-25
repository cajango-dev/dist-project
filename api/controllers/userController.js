const { supabase } = require('../supabaseClient');

exports.createUser = async (req, res) => {
  try {
    const { name, cargo, senha_hash } = req.body;

    if (!name || !cargo || !senha_hash) {
      return res.status(400).json({ message: 'Nome, cargo e senha_hash são obrigatórios' });
    }

    const { data, error } = await supabase
      .from('usuario')
      .insert([{ name, cargo, senha_hash }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao criar usuário', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuario')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro interno ao buscar usuários', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('id_usuario', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao buscar usuário', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, cargo, senha_hash } = req.body;

    const { data, error } = await supabase
      .from('usuario')
      .update({ name, cargo, senha_hash })
      .eq('id_usuario', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar usuário', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { data, error } = await supabase
      .from('usuario')
      .delete()
      .eq('id_usuario', id)
      .select();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      throw error;
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao deletar usuário', error: error.message });
  }
};
