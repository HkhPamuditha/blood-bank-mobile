// Import mongoose (used to define schema and interact with MongoDB)
const mongoose = require('mongoose');

const bloodStockSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  // Blood group (e.g., A+, B-, O+)
  bloodGroup: { type: String, required: true },
  // Number of blood units available
  unitsAvailable: { type: Number, required: true, default: 0 },
}, { timestamps: true });

// Ensure unique blood group per hospital
bloodStockSchema.index({ hospitalId: 1, bloodGroup: 1 }, { unique: true });
// Export model so it can be used in controllers
module.exports = mongoose.model('BloodStock', bloodStockSchema);
