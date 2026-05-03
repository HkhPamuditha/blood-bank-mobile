const express = require('express');
const router = express.Router();
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getHospitals).post(protect, createHospital);
router.route('/:id').put(protect, updateHospital).delete(protect, 

module.exports = router;
