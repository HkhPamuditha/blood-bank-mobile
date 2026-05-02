const express = require('express');
const router = express.Router();
const { getBloodStock, updateBloodStock } = require('../controllers/bloodStockController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBloodStock).post(protect, updateBloodStock);

module.exports = router;
