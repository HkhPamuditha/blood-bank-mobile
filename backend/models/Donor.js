const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nic: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  medicalReport: { type: String }, // Path or URL to the uploaded medical report
  status: { type: String, enum: ['Pending', 'Eligible', 'Not Eligible'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
