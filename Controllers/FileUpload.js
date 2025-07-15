const path = require('path');
const multer = require('multer');
const express = require('express');
const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./Views'));

app.use(express.urlencoded({ extended: false })); // Use extended: false for simpler parsing

// Set up storage engine for multer

const uploadFile = (req, res) => {
  console.log(req.body);
  console.log(req.file);

  res.send('File uploaded successfully');
//   return res.redirect('/upload');
};

module.exports = { uploadFile };