const express = require('express');
const router = express.Router();
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getHospitals).post(protect, createHospital);


module.exports = router;
