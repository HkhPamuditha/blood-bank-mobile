const express = require('express');
const router = express.Router();
const { getBloodCamps, createBloodCamp, updateBloodCamp, deleteBloodCamp } = require('../controllers/bloodCampController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBloodCamps).post(protect, createBloodCamp);
router.route('/:id').put(protect, updateBloodCamp).delete(protect, deleteBloodCamp);

module.exports = router;
