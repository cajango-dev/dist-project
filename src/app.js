const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');
const swaggerConfig = require('./swagger');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados (substitua pela sua string de conexão)

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/distribuidora', {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//})
//.then(() => console.log('Conectado ao MongoDB'))
//.catch(err => console.error('Erro na conexão com MongoDB:', err));

// Rotas
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/produtos', produtoRoutes);

// Porta
const PORT = process.env.PORT || 5000;
swaggerConfig(app);
app.listen(PORT, () => console.log(`Documentação rodando em https://localhost:${PORT}/api-docs`));
app.listen(PORT, () => console.log(`Servidor rodando em https://localhost:${PORT}`));
