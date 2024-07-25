const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = file.originalname.replace(/\.[^.]+$/, "");
        const ext = path.extname(file.originalname);
        const constructedFilename = filename + "-" + uniqueSuffix + ext;
        req.body.imgSrc = constructedFilename;
        cb(null, constructedFilename); // Save the file with this name
        
    }
});

// File filter for validation
const fileFilter = (req, file, cb) => {
    // Accept images, PDFs, and documents
    const allowedTypes = ['image/', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.some(type => file.mimetype.startsWith(type))) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'), false);
    }
};

// Initialize Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Controller for handling the upload
const uploadCtrl = require("../controllers/upload.ctrl"); // Corrected filename to match provided code

// POST route for file upload
router.post("/", upload.single("file"), (req, res) => {
    if (req.file) {
        uploadCtrl.sendFileName(req, res);
    } else {
        res.status(400).send('No file uploaded.');
    }
});

// Error handling middleware for Multer errors
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer specific error
        res.status(400).send(`Multer error: ${err.message}`);
    } else {
        // General error
        res.status(500).send(`Server error: ${err.message}`);
    }
});

module.exports = router;











// // upload.router.js

// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const router = express.Router();

// // Configure Multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const filename = file.originalname.replace(/\.[^.]+$/, "");
//         const ext = path.extname(file.originalname);
//         const constructedFilename = filename + "-" + uniqueSuffix + ext;
//         req.body.imgSrc = constructedFilename;
//         cb(null, constructedFilename);
//     }
// });

// // File filter for validation
// const fileFilter = (req, file, cb) => {
//     // Accept images, PDFs, and documents
//     const allowedTypes = ['image/', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//     if (allowedTypes.some(type => file.mimetype.startsWith(type))) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'), false);
//     }
// };

// // Initialize Multer
// const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
// });

// // Controller for handling the upload
// const uploadCtrl = require("./upload.ctrl");

// // POST route for file upload
// router.post("/", upload.single("file"), (req, res) => {
//     if (req.file) {
//         uploadCtrl.sendFileName(req, res);
//     } else {
//         res.status(400).send('No file uploaded.');
//     }
// });

// // Error handling middleware for Multer errors
// router.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         // Multer specific error
//         res.status(400).send(`Multer error: ${err.message}`);
//     } else {
//         // General error
//         res.status(500).send(`Server error: ${err.message}`);
//     }
// });

// module.exports = router;
