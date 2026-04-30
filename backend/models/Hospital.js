const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
