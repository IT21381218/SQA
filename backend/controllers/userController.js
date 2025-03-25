// backend/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, nic, age, gender, profilePic } = req.body;

    if (!name || !email || !password || !nic || !age || !gender) {
        return res.status(400).send('Missing required fields');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            nic,
            age,
            gender,
            profilePic, // Profile picture URL or path
        });

        res.json({ token: generateToken(user._id) });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Server error');
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ token: generateToken(user._id) });
};


// Get user profile
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
};

module.exports = { registerUser, loginUser, getUserProfile };
