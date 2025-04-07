const express = require('express');
const cors = require('cors');
const swaggerConfig = require('./swagger');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do Swagger (ANTES de iniciar o servidor)
swaggerConfig(app);

// Rotas
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);        // 🛒 Novo endpoint
app.use('/api/relatorios', relatorioRoutes);  // 📊 Novo endpoint

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📄 Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});
