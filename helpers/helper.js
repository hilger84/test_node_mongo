exports.sendSuccess = (res, data, message = 'Operación exitosa') => {
    res.status(200).json({
        success: true,
        message,
        data
    });
};

exports.sendError = (res, statusCode = 500, message = 'Error interno del servidor', error = null) => {
    res.status(statusCode).json({
        success: false,
        message,
        error: error ? error.message || error : null
    });
};