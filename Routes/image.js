const express = require('express');
const api = express.Router();
const { uploadImage, uploadImageUser, getImage } = require('../Controllers/imageControllers');
const { ensureAuth } = require('../Middlewares/authenticated');
const { isAdmin } = require('../Middlewares/isAdmin');
const {isMongoId} = require('../Middlewares/validar-campos');
api.put('/users/:id', ensureAuth,isMongoId, uploadImageUser);
api.put('/:collection/:id', ensureAuth, isAdmin,isMongoId, uploadImage);
api.get('/image-:collection/:id', ensureAuth,isMongoId, getImage);


module.exports = api;