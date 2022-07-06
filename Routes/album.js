const express = require('express');
const api = express.Router();
const albumController = require('../Controllers/albumControllers/index');

api.post('/new-album', albumController.albumRegister);
api.get('/find-album', albumController.findAlbum);
api.get('/find-album/:id', albumController.findAlbumId);
api.get('/album', albumController.albumPaginate);
module.exports = api;