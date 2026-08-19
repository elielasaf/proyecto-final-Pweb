const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');
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

// Manejo de errores (deben ir al final, después de todas las rutas)
app.use(notFound);
app.use(errorHandler);

module.exports = app;