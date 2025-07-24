require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const countryRoutes = require('./routes/country');
const stateRoutes = require('./routes/state');
const { sendSuccess } = require('./helpers/helper');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Rutas de la API
app.use('/api', stateRoutes);
app.use('/api', countryRoutes);

// Ruta de bienvenida (opcional) - AHORA EN FORMATO JSON
app.get('/', (req, res) => {
    sendSuccess(res, null, '¡Bienvenido a la API de mongo con node!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});