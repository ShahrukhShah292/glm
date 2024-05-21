const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  blr_id: String,
  blr_name: String,
  blr_category_name: String,
  blr_coverage: String
});

module.exports = mongoose.model('Data', DataSchema);
