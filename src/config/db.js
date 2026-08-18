const mongoose = require('mongoose');
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Fuerza el uso de DNS públicos antes de conectar.
// Soluciona el error "querySrv ECONNREFUSED" que ocurre cuando el DNS
// del router/ISP no resuelve bien los registros SRV que usa mongodb+srv://
dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Base de datos conectada exitosamente a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;