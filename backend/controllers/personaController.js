const Persona = require('../models/Persona');

// POST: Crear nuevo registro
exports.crearPersona = async (req, res) => {
  try {
    const persona = new Persona(req.body);
    await persona.save();
    res.status(201).json(persona);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET: Leer todos los registros
exports.obtenerPersonas = async (req, res) => {
  try {
    const personas = await Persona.find();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Leer un registro por ID
exports.obtenerPersonaPorId = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) return res.status(404).json({ error: 'No encontrado' });
    res.json(persona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT: Actualizar un registro por ID
exports.actualizarPersona = async (req, res) => {
  try {
    const persona = await Persona.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!persona) return res.status(404).json({ error: 'No encontrado' });
    res.json(persona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Eliminar un registro por ID
exports.eliminarPersona = async (req, res) => {
  try {
    const persona = await Persona.findByIdAndDelete(req.params.id);
    if (!persona) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Eliminar registros de manera masiva
exports.eliminarPersonasMasivo = async (req, res) => {
  try {
    const result = await Persona.deleteMany({});
    res.json({ mensaje: 'Todos los registros eliminados', resultado: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: Agregar registros de manera masiva
exports.crearPersonasMasivo = async (req, res) => {
  try {
    const personas = await Persona.insertMany(req.body);
    res.status(201).json(personas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
