const BloodCamp = require('../models/BloodCamp');

exports.getBloodCamps = async (req, res) => {
  try {
    const bloodCamps = await BloodCamp.find().sort({ date: 1 });
    res.json(bloodCamps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBloodCamp = async (req, res) => {
  try {
    const bloodCamp = await BloodCamp.create(req.body);
    res.status(201).json(bloodCamp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBloodCamp = async (req, res) => {
  try {
    const bloodCamp = await BloodCamp.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bloodCamp) return res.status(404).json({ message: 'Blood Camp not found' });
    res.json(bloodCamp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBloodCamp = async (req, res) => {
  try {
    const bloodCamp = await BloodCamp.findByIdAndDelete(req.params.id);
    if (!bloodCamp) return res.status(404).json({ message: 'Blood Camp not found' });
    res.json({ message: 'Blood Camp deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
