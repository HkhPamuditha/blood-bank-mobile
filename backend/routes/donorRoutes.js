const express = require('express');
const router = express.Router();
const { getDonors, createDonor, updateDonor, deleteDonor } = require('../controllers/donorController');
const { protect, superAdmin } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.route('/').get(protect, getDonors).post(protect, createDonor);
router.route('/:id').put(protect, updateDonor).delete(protect, superAdmin, deleteDonor);
router.route('/:id/upload-report').post(protect, upload.single('medicalReport'), require('../controllers/donorController').uploadReport);

module.exports = router;
