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

// Listar todos los contactos, o buscar por nombre con ?nombre=texto
// (GET /api/contactos  |  GET /api/contactos?nombre=ana)
const getContactos = async (req, res) => {
    try {
        const { nombre } = req.query;
        const filtro = {};

        if (nombre) {
            // Búsqueda parcial, insensible a mayúsculas/minúsculas
            filtro.nombre = { $regex: nombre, $options: 'i' };
        }

        const contactos = await Contacto.find(filtro).sort({ nombre: 1 });
        res.status(200).json(contactos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los contactos', error: error.message });
    }
};

// Obtener un contacto por su ID (GET /api/contactos/:id)
const getContactoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const contacto = await Contacto.findById(id);

        if (!contacto) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }

        res.status(200).json(contacto);
    } catch (error) {
        // CastError = id con formato inválido (no es un ObjectId de Mongo)
        if (error.name === 'CastError') {
            return res.status(400).json({ mensaje: 'ID de contacto inválido' });
        }
        res.status(500).json({ mensaje: 'Error al obtener el contacto', error: error.message });
    }
};

// Eliminar un contacto (DELETE /api/contactos/:id)
const eliminarContacto = async (req, res) => {
    try {
        const { id } = req.params;
        const contactoEliminado = await Contacto.findByIdAndDelete(id);

        if (!contactoEliminado) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado' });
        }

        res.status(200).json({ mensaje: 'Contacto eliminado correctamente', contacto: contactoEliminado });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ mensaje: 'ID de contacto inválido' });
        }
        res.status(500).json({ mensaje: 'Error al eliminar el contacto', error: error.message });
    }
};

module.exports = {
    crearContacto,
    actualizarContacto,
    getContactos,
    getContactoPorId,
    eliminarContacto
};