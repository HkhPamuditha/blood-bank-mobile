// Import BloodStock model
const BloodStock = require('../models/BloodStock');

exports.getBloodStock = async (req, res) => {
  try {
    const { hospitalId } = req.query;
    let query = {};
    if (hospitalId) {
      query.hospitalId = hospitalId;
    }
    const stock = await BloodStock.find(query).populate('hospitalId', 'hospitalName');
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBloodStock = async (req, res) => {
  try {
    // If not exists → create new record
    const { hospitalId, bloodGroup, unitsAvailable } = req.body;
    
    if (!hospitalId) {
      // Check if hospitalId is missing
      return res.status(400).json({ message: 'hospitalId is required' });
    }

    let stock = await BloodStock.findOne({ hospitalId, bloodGroup });

    if (stock) {
      // If stock exists → update units
      stock.unitsAvailable = unitsAvailable;
      await stock.save();
    } else {
      stock = await BloodStock.create({ hospitalId, bloodGroup, unitsAvailable });
    }
    // Send updated or newly created stock
    res.json(stock);
  } catch (error) {
    // If validation or other error occurs
    res.status(400).json({ message: error.message });
  }
};
