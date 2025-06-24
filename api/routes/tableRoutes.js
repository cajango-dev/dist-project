const express = require('express');
const router = express.Router();
const TableController = require('../controllers/tableController');

router.get('/', TableController.listTables);
router.get('/:id', TableController.getTableById);
router.post('/', TableController.createTable);
router.put('/:id', TableController.updateTable);
router.delete('/:id', TableController.deleteTable);

module.exports = router;
