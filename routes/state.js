const express = require('express');
const router = express.Router();
const stateController = require('../controllers/state');

router.get('/states', stateController.getAllStates);
router.get('/states/:code', stateController.getStateById);
router.post('/states', stateController.createState);
router.put('/states/:code', stateController.updateState);
router.delete('/states/:code', stateController.deleteState);

module.exports = router;