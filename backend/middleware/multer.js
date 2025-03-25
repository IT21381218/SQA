// backend/middleware/multer.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Path to the uploads directory
const uploadDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists, create it if it doesn't
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to store files in the 'uploads' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Ensure each file has a unique name
    },
});

const upload = multer({ storage });

module.exports = upload;
