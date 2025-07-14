// models/Color.js
const mongoose = require('../db');

const colorSchema = new mongoose.Schema({
  hex: String,
  rgb: Object,
  name: String,
  tags: Array,
  isActive: Boolean
});
console.log('colors.js')
module.exports = mongoose.model('Color', colorSchema);
