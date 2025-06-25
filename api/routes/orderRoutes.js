const express = require('express');
const router = express.Router();
const { supabase } = require('../supabaseClient');

// Rota GET para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('usuario').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Rota POST para criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const { id_usuario, nome, cargo, senha_hash } = req.body;

    if (!id_usuario || !nome || !cargo || !senha_hash) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: id_usuario, nome, cargo, senha_hash' });
    }

    const { data, error } = await supabase
      .from('usuario')
      .insert([{ id_usuario, nome, cargo, senha_hash }]);

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: 'Usuário criado com sucesso', data });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
