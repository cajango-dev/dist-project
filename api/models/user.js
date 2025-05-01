const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tipo: { type: String, enum: ['admin', 'vendedor'], default: 'vendedor' }
});

module.exports = mongoose.model('User', userSchema);
