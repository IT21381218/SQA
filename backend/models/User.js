// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    nic: { type: String, required: true, unique: true },  // New field
    age: { type: Number, required: true },                // New field
    gender: { type: String, required: true },              // New field
    profilePic: { type: String },                          // New field (URL for the profile picture)
});

module.exports = mongoose.model('User', userSchema);
