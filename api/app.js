const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);

const { supabase } = require('./supabaseClient');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const clientRoutes = require('./routes/clientRoutes');


const app = express();

// Configuração do CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rota teste simples para conexão Supabase
app.get('/teste', async (req, res) => {
  try {
    const { data, error } = await supabase.from('usuario').select('*').limit(1);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Rota POST teste para criar um novo usuário
app.post('/usuario', async (req, res) => {
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

// Rota GET para listar todos os usuários
app.get('/usuario', async (req, res) => {
  try {
    const { data, error } = await supabase.from('usuario').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno' });
  }
});



// Rotas da aplicação
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/orders', orderRoutes);
app.use('/reports', reportRoutes);
app.use('/payments', paymentRoutes); 
app.use('/cliente', clientRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Middleware para tratar erros
app.use((err, req, res, next) => {
    console.error('Erro interno:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});
