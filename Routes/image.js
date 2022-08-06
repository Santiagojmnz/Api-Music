const express = require('express');
const api = express.Router();
const { uploadImage, uploadImageUser, getImage } = require('../Controllers/imageControllers');
const { ensureAuth } = require('../Middlewares/authenticated');
const { isAdmin } = require('../Middlewares/isAdmin');
api.put('/users/:id', ensureAuth, uploadImageUser);
api.put('/:collection/:id', ensureAuth, isAdmin, uploadImage);
api.get('/image-:collection/:id', ensureAuth, getImage);


module.exports = api;