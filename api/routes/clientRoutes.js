const express = require('express');
const router = express.Router();
const { supabase } = require('../supabaseClient');

// GET - listar todos os clientes
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('cliente').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
  }
});

// POST - criar cliente com nome, email, status, cpf e telefone
router.post('/', async (req, res) => {
  try {
    const { nome, email, status, cpf, telefone } = req.body;
    if (!nome || !email || !status) {
      return res.status(400).json({ message: 'Campos obrigatórios: nome, email, status' });
    }
    const { data, error } = await supabase
      .from('cliente')
      .insert([{ nome, email, status, cpf, telefone }])
      .select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
  }
});

// PUT - atualizar cliente sem status (ou sem colunas inexistentes)
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, email, cpf, telefone } = req.body; // sem status
    const updateData = { nome, email, cpf, telefone };

    // Remover propriedades undefined (caso não envie)
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    const { data, error } = await supabase
      .from('cliente')
      .update(updateData)
      .eq('id_cliente', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
  }
});


// DELETE - deletar cliente
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { error } = await supabase.from('cliente').delete().eq('id_cliente', id);
    if (error) throw error;
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ message: 'Erro ao deletar cliente', error: error.message });
  }
});

module.exports = router;
