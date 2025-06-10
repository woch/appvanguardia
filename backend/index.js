const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const personasRoutes = require('./routes/personas');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/personas', personasRoutes);

mongoose.connect('mongodb+srv://wochsky:wcan5002@cluster0.uahsr.mongodb.net/miapp?retryWrites=true&w=majority')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB Atlas:', err));


app.listen(3000, () => console.log('Servidor backend en puerto 3000'));
