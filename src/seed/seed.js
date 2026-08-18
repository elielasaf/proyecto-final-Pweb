// Ejecutar con: node src/seed/seed.js
// Requiere que MONGO_URI esté definido en el .env de la raíz del proyecto

require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const Contacto = require('../models/Contacto');

const contactosDePrueba = [
    {
        nombre: 'Ana García',
        telefono: '555-1234',
        correo: 'ana.garcia@email.com',
        empresa: 'Tech Solutions',
        notas: 'Cliente frecuente'
    },
    {
        nombre: 'Luis Martínez',
        telefono: '555-5678',
        correo: 'luis.martinez@email.com',
        empresa: 'Diseños LM',
        notas: ''
    },
    {
        nombre: 'Carla Pérez',
        telefono: '555-8765',
        correo: 'carla.perez@email.com',
        empresa: 'Consultora CP',
        notas: 'Contactar solo por las tardes'
    },
    {
        nombre: 'Jorge Ramírez',
        telefono: '555-4321',
        correo: 'jorge.ramirez@email.com',
        empresa: '',
        notas: 'Proveedor'
    },
    {
        nombre: 'Sofía Torres',
        telefono: '555-9999',
        correo: 'sofia.torres@email.com',
        empresa: 'Torres & Asociados',
        notas: ''
    },
    {
        nombre: 'Ana López',
        telefono: '555-3333',
        correo: 'ana.lopez@email.com',
        empresa: 'López Studio',
        notas: 'Nombre repetido a propósito para probar el buscador'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');

        await Contacto.deleteMany();
        console.log('Contactos anteriores eliminados');

        await Contacto.insertMany(contactosDePrueba);
        console.log(`${contactosDePrueba.length} contactos de prueba insertados`);

        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
};

seedDB();
