// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        } catch (error) {
            res.status(401).send('Not authorized');
        }
    } else {
        res.status(401).send('No token');
    }
};

module.exports = { protect };
