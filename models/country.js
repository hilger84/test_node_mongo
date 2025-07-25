const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  capital: { type: String, required: true },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;