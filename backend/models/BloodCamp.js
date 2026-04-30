const mongoose = require('mongoose');

const bloodCampSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
}, { timestamps: true });

module.exports = mongoose.model('BloodCamp', bloodCampSchema);
