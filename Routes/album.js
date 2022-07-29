const express = require('express');
const api = express.Router();
const albumController = require('../Controllers/albumControllers/index');
const { ensureAuth } = require('../Middlewares/authenticated');
const { isAdmin } = require('../Middlewares/isAdmin');
api.post('/new-album', ensureAuth, isAdmin, albumController.albumRegister);
api.put('/update-album/:id', ensureAuth, isAdmin, albumController.updateAlbum);
api.delete('/delete-album/:id', ensureAuth, isAdmin, albumController.deleteAlbum);
api.get('/find-album', ensureAuth, albumController.findAlbum);
api.get('/find-album/:id', ensureAuth, albumController.findAlbumId);
api.get('/albums/:page', ensureAuth, albumController.albumPaginate);


module.exports = api;