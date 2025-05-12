const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const paymentRoutes = require('./routes/paymentRoutes');  

const app = express();


// Configuração do CORS
app.use(cors({
    origin: '*',  // Permite qualquer origem (em produção, use um domínio específico)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

// Conexão com o MongoDB
// mongoose.connect('mongodb://localhost:27017/erp_distribuidora', { useNewUrlParser: true, useUnifiedTopology: true })
//    .then(() => console.log('MongoDB connected'))
//    .catch(err => console.log(err));

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/orders', orderRoutes);
app.use('/reports', reportRoutes);
app.use('/payments', paymentRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
    console.error('Erro interno:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  });