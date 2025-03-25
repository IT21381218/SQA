// backend/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ token: generateToken(user._id) });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ token: generateToken(user._id) });
    } else {
        res.status(401).send('Invalid credentials');
    }
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};

module.exports = { registerUser, loginUser, getUserProfile };