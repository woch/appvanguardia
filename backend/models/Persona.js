const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: String, required: true }
});

module.exports = mongoose.model('Persona', PersonaSchema);
