// backend/routes/userRoutes.js
const express = require('express');
const upload = require('../middleware/multer'); // Import multer
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', upload.single('profilePic'), registerUser);  // Handle file upload
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
