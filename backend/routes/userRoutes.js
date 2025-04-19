const express = require("express")
const upload = require("../middleware/multer")
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/register", upload.single("profilePic"), registerUser)
router.post("/login", loginUser)

// Protected routes
router.route("/profile").get(protect, getUserProfile).put(protect, upload.single("profilePic"), updateUserProfile)

module.exports = router
