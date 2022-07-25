const express = require('express');
const api = express.Router();
const { uploadImage, getImage } = require('../Controllers/imageControllers');
api.put('/:collection/:id', uploadImage);
api.get('/image-:collection/:id', getImage);


module.exports = api;