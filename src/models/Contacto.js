const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es obligatorio'],
        trim: true
    },
    telefono: {
        type: String,
        required: [true, 'El campo teléfono es obligatorio'],
        trim: true
    },
    correo: {
        type: String,
        required: [true, 'El campo correo es obligatorio'],
        trim: true,
        lowercase: true
    },
    empresa: {
        type: String,
        trim: true
    },
    notas: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contacto', contactoSchema);