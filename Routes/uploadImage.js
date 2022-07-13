const express = require('express');
const api = express.Router();
const { uploadImage } = require('../Controllers/uploadControllers');
api.put('/:collection/:id', uploadImage);


module.exports = api;