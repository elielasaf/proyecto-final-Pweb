const Contacto = require('../models/Contacto');

// Crear un contacto (POST /api/contactos)
const crearContacto = async (req, res) => {
    try {
        const nuevoContacto = new Contacto(req.body);
        const contactoGuardado = await nuevoContacto.save();
        res.status(201).json(contactoGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el contacto', error: error.message });
    }
};

// Actualizar un contacto (PUT / PATCH /api/contactos/:id)
const actualizarContacto = async (req, res) => {
    try {
        const { id } = req.params;
        const contactoActualizado = await Contacto.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true // Aplica las validaciones del esquema en la actualización
        });

        if (!contactoActualizado) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }

        res.status(200).json(contactoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el contacto', error: error.message });
    }
};

module.exports = {
    crearContacto,
    actualizarContacto
};