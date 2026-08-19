const express = require('express');
const router = express.Router();
const {
    crearContacto,
    actualizarContacto,
    getContactos,
    getContactoPorId,
    eliminarContacto
} = require('../controllers/contactoController');

// Persona 2: lectura, búsqueda y eliminación
router.get('/', getContactos);          // lista todos, o filtra con ?nombre=texto
router.get('/:id', getContactoPorId);

// Persona 1: creación y actualización
router.post('/', crearContacto);
router.put('/:id', actualizarContacto);
router.patch('/:id', actualizarContacto); // Soporte para actualizaciones parciales

// Persona 2: eliminación
router.delete('/:id', eliminarContacto);

module.exports = router;