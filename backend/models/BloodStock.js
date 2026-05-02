const mongoose = require('mongoose');

const bloodStockSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  bloodGroup: { type: String, required: true },
  unitsAvailable: { type: Number, required: true, default: 0 },
}, { timestamps: true });

// Ensure unique blood group per hospital
bloodStockSchema.index({ hospitalId: 1, bloodGroup: 1 }, { unique: true });

module.exports = mongoose.model('BloodStock', bloodStockSchema);
