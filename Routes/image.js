const express = require('express');
const api = express.Router();
const { uploadImage, uploadImageUser, } = require('../Controllers/imageControllers');
const { ensureAuth } = require('../Middlewares/authenticated');
const { isAdmin } = require('../Middlewares/isAdmin');
const { isMongoId, isValidImage, isValidCollection } = require('../Middlewares/validar-campos');
api.put('/users/:id', ensureAuth, isMongoId, isValidImage, uploadImageUser);
api.put('/update-img-:collection/:id', ensureAuth, isAdmin, isValidCollection, isMongoId, isValidImage, uploadImage);



module.exports = api;