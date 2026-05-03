const Donor = require('../models/Donor');

exports.getDonors = async (req, res) => {
  try {
    const query = req.query.nic ? { nic: { $regex: req.query.nic, $options: 'i' } } : {};
    const donors = await Donor.find(query);
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDonor = async (req, res) => {
  try {
    const donor = await Donor.create(req.body);
    res.status(201).json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json({ message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
