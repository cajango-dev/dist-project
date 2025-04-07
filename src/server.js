const express = require('express');
const app = express();
const port = 5000;

// Rota simples
app.get('/', (req, res) => {
    res.send('Backend rodando localmente!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
