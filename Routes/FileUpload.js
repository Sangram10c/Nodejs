const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../Controllers/FileUpload');
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './Data'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST /upload
router.post('/upload', upload.single('Data'), uploadFile);

module.exports = router;
