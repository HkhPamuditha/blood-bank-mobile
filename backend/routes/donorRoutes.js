const express = require('express');
const router = express.Router();
const { getDonors, createDonor, updateDonor, deleteDonor } = require('../controllers/donorController');
const { protect, superAdmin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getDonors).post(protect, createDonor);
router.route('/:id').put(protect, updateDonor).delete(protect, superAdmin, deleteDonor);

module.exports = router;
