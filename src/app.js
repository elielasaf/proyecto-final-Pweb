const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
require('dotenv').config();

// Inicializar Express
const app = express();

// Conectar a la Base de Datos
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/contactos', require('./routes/contactoRoutes'));

module.exports = app;