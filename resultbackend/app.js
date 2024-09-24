// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const Image = require('./models/Image'); // Import the model

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));


// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect('mongodb://localhost/imageUploads', { useNewUrlParser: true, useUnifiedTopology: true });

// Route to serve the form to upload images
app.get('/adminres', (req, res) => {
  res.render('uploadForm');
});

// Handling form submission
app.post('/updated', upload.fields([
  { name: 'imageA' }, { name: 'imageB' }, { name: 'imageC' },
  { name: 'imageD' }, { name: 'imageE' }, { name: 'imageF' }
]), (req, res) => {
  const image = new Image({
    imageA: req.files['imageA'][0].filename,
    descriptionA1: req.body.descriptionA1,
    descriptionA2: req.body.descriptionA2,
    descriptionA3: req.body.descriptionA3,

    imageB: req.files['imageB'][0].filename,
    descriptionB1: req.body.descriptionB1,
    descriptionB2: req.body.descriptionB2,
    descriptionB3: req.body.descriptionB3,

    imageC: req.files['imageC'][0].filename,
    descriptionC1: req.body.descriptionC1,
    descriptionC2: req.body.descriptionC2,
    descriptionC3: req.body.descriptionC3,

    imageD: req.files['imageD'][0].filename,
    descriptionD1: req.body.descriptionD1,
    descriptionD2: req.body.descriptionD2,
    descriptionD3: req.body.descriptionD3,

    imageE: req.files['imageE'][0].filename,
    descriptionE1: req.body.descriptionE1,
    descriptionE2: req.body.descriptionE2,
    descriptionE3: req.body.descriptionE3,

    imageF: req.files['imageF'][0].filename,
    descriptionF1: req.body.descriptionF1,
    descriptionF2: req.body.descriptionF2,
    descriptionF3: req.body.descriptionF3,
  });

  image.save().then(() => {
    res.redirect('/');
  }).catch(err => {
    console.error(err);
    res.send('Error uploading images');
  });
});

// Route to display uploaded images
app.get('/', async (req, res) => {
  const images = await Image.findOne().sort({ _id: -1 }).exec();
  res.render('displayImages', { images });
});
app.get('/display-images', (req, res) => {
    const images = {
        imageA: 'path_to_imageA',
        descriptionA1: 'Description 1',
        descriptionA2: 'Description 2',
        descriptionA3: 'Description 3',
        // Add other images as needed
    };
    res.render('displayImages', { images });
});
// Starting the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
