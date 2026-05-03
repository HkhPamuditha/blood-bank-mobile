const express = require('express');
const router = express.Router();
const { loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');


router.get('/me', protect, getMe);
router.post('/login', loginUser);

module.exports = router;
