const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientController');

// GET - Lista todos os clientes
router.get('/', ClientController.listClients);

// POST - Cria um novo cliente
router.post('/', ClientController.createClient);

// PUT - Atualiza um cliente existente
router.put('/:id', ClientController.updateClient);

// DELETE - Remove um cliente
router.delete('/:id', ClientController.deleteClient);

module.exports = router;
