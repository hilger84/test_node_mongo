const express = require('express');
const router = express.Router();
const countryController = require('../controllers/country');

router.get('/countries', countryController.getAllCountries);
router.get('/countries/:code', countryController.getCountryByCode);
router.post('/countries', countryController.createCountry);
router.put('/countries/:code', countryController.updateCountry);
router.delete('/countries/:code', countryController.deleteCountry);

module.exports = router;