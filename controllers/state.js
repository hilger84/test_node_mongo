const State = require('../models/state');
const { sendSuccess, sendError } = require('../helpers/helper');

const getAllStates = async (req, res) => {
  try {
    const states = await State.find({}).populate('country', 'name id');
    sendSuccess(res, states, 'Estados obtenidos exitosamente.');
  } catch (error) {
    console.error('Error al obtener estados:', error);
    sendError(res, 500, 'Error interno del servidor al obtener estados.', error);
  }
};

const getStateById = async (req, res) => {
  try {
    const stateId = req.params.id.toUpperCase();
    const state = await State.findOne({ id: stateId }).populate('country', 'name id');

    if (!state) {
      return sendError(res, 404, 'Estado no encontrado.');
    }
    sendSuccess(res, state, 'Estado obtenido exitosamente.');
  } catch (error) {
    console.error('Error al obtener Estado por código:', error);
    sendError(res, 500, 'Error interno del servidor al obtener el Estado.', error);
  }
};

const createState = async (req, res) => {
  try {
    const newState = new State(req.body);
    await newState.save();

    const stateWithCountry = await State.findById(newState._id).populate('country', 'name id');
    sendSuccess(res, newState, 'Estado creado exitosamente.');
  } catch (error) {
    console.error('Error al crear Estado:', error);
    if (error.id === 11000) { // Código de error de duplicado en MongoDB
      return sendError(res, 409, 'El código del Estado ya existe.', error);
    }
    sendError(res, 400, 'Datos de Estado inválidos o incompletos.', error);
  }
};

const updateState = async (req, res) => {
  try {
    const stateId = req.params.id.toUpperCase();
    const updatedState = await State.findOneAndUpdate(
      { id: stateId },
      req.body,
      { new: true, runValidators: true }
    ).populate('country', 'name code');

    if (!updatedState) {
      return sendError(res, 404, 'Estado no encontrado para actualizar.');
    }
    sendSuccess(res, updatedState, 'Estado actualizado exitosamente.');
  } catch (error) {
    console.error('Error al actualizar Estado:', error);
    sendError(res, 400, 'Error al actualizar el Estado.', error);
  }
};

const deleteState = async (req, res) => {
  try {
    const stateId = req.params.id.toUpperCase();
    const result = await State.deleteOne({ id: stateId });

    if (result.deletedCount === 0) {
      return sendError(res, 404, 'Estado no encontrado para eliminar.');
    }
    sendSuccess(res, { deletedCount: result.deletedCount }, 'Estado eliminado exitosamente.');
  } catch (error) {
    console.error('Error al eliminar Estado:', error);
    sendError(res, 500, 'Error interno del servidor al eliminar el Estado.', error);
  }
};

module.exports = {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState
};