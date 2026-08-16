const express = require('express');
const router = express.Router();
const { crearContacto, actualizarContacto } = require('../controllers/contactoController');

router.post('/', crearContacto);
router.put('/:id', actualizarContacto);
router.patch('/:id', actualizarContacto); // Soporte para actualizaciones parciales

module.exports = router;