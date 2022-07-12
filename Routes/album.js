const express = require('express');
const api = express.Router();
const albumController = require('../Controllers/albumControllers/index');
api.post('/new-album', albumController.albumRegister);
api.put('/update-album/:id', albumController.updateAlbum);
api.delete('/delete-album/:id', albumController.deleteAlbum);
api.get('/find-album', albumController.findAlbum);
api.get('/find-album/:id', albumController.findAlbumId);
api.get('/albums/:page', albumController.albumPaginate);


module.exports = api;