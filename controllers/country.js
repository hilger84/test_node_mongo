const Country = require('../models/country');
const { sendSuccess, sendError } = require('../helpers/helper');

const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find({});
    sendSuccess(res, countries, 'Países obtenidos exitosamente.');
  } catch (error) {
    console.error('Error al obtener países:', error);
    sendError(res, 500, 'Error interno del servidor al obtener países.', error);
  }
};

const getCountryByCode = async (req, res) => {
  try {
    const countryCode = req.params.code.toUpperCase();
    const country = await Country.findOne({ code: countryCode });

    if (!country) {
      return sendError(res, 404, 'País no encontrado.');
    }
    sendSuccess(res, country, 'País obtenido exitosamente.');
  } catch (error) {
    console.error('Error al obtener país por código:', error);
    sendError(res, 500, 'Error interno del servidor al obtener el país.', error);
  }
};

const createCountry = async (req, res) => {
  try {
    const newCountry = new Country(req.body);
    await newCountry.save();
    sendSuccess(res, newCountry, 'País creado exitosamente.');
  } catch (error) {
    console.error('Error al crear país:', error);
    if (error.code === 11000) { // Código de error de duplicado en MongoDB
      return sendError(res, 409, 'El código del país ya existe.', error);
    }
    sendError(res, 400, 'Datos de país inválidos o incompletos.', error);
  }
};

const updateCountry = async (req, res) => {
  try {
    const countryCode = req.params.code.toUpperCase();
    const updatedCountry = await Country.findOneAndUpdate(
      { code: countryCode },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCountry) {
      return sendError(res, 404, 'País no encontrado para actualizar.');
    }
    sendSuccess(res, updatedCountry, 'País actualizado exitosamente.');
  } catch (error) {
    console.error('Error al actualizar país:', error);
    sendError(res, 400, 'Error al actualizar el país.', error);
  }
};

const deleteCountry = async (req, res) => {
  try {
    const countryCode = req.params.code.toUpperCase();
    const result = await Country.deleteOne({ code: countryCode });

    if (result.deletedCount === 0) {
      return sendError(res, 404, 'País no encontrado para eliminar.');
    }
    sendSuccess(res, { deletedCount: result.deletedCount }, 'País eliminado exitosamente.');
  } catch (error) {
    console.error('Error al eliminar país:', error);
    sendError(res, 500, 'Error interno del servidor al eliminar el país.', error);
  }
};

module.exports = {
  getAllCountries,
  getCountryByCode,
  createCountry,
  updateCountry,
  deleteCountry
};