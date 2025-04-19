const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const fs = require("fs")

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, nic, age, gender } = req.body

  if (!name || !email || !password || !nic || !age || !gender) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    // Handle profile picture if uploaded
    const profilePic = req.file ? req.file.path : null

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      nic,
      age,
      gender,
      profilePic,
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error("Error registering user:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error("Error logging in:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update basic fields
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.age = req.body.age || user.age
    user.gender = req.body.gender || user.gender

    // Update password if provided
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10)
    }

    // Handle profile picture if uploaded
    if (req.file) {
      // Delete old profile picture if exists
      if (user.profilePic) {
        try {
          fs.unlinkSync(user.profilePic)
        } catch (err) {
          console.error("Error deleting old profile picture:", err)
        }
      }
      user.profilePic = req.file.path
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      gender: updatedUser.gender,
      profilePic: updatedUser.profilePic,
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
}
