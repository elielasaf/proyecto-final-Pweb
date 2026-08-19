// Se activa cuando ninguna ruta coincide con la petición (404 genérico)
const notFound = (req, res, next) => {
    res.status(404).json({ mensaje: `Ruta no encontrada: ${req.originalUrl}` });
};

// Middleware central de errores. Atrapa cualquier error que no haya sido
// manejado dentro de un controlador (por ejemplo, si algún try/catch se olvida).
// Debe registrarse SIEMPRE al final de app.js, después de las rutas.
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let mensaje = err.message || 'Error interno del servidor';

    if (err.name === 'CastError') {
        statusCode = 400;
        mensaje = `ID inválido: ${err.value}`;
    }

    if (err.name === 'ValidationError') {
        statusCode = 400;
        mensaje = Object.values(err.errors).map((e) => e.message).join(', ');
    }

    res.status(statusCode).json({ mensaje });
};

module.exports = { notFound, errorHandler };
