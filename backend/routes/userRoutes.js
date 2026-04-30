const express = require('express');
const router = express.Router();
const { getAdmins, createAdmin, deleteAdmin } = require('../controllers/userController');
const { protect, superAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, superAdmin, getAdmins)
  .post(protect, superAdmin, createAdmin);

router.route('/:id')
  .delete(protect, superAdmin, deleteAdmin);

module.exports = router;
