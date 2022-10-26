const express = require('express');
const api = express.Router();
const albumController = require('../Controllers/albumControllers/index');
const { ensureAuth } = require('../Middlewares/authenticated');
const { isAdmin } = require('../Middlewares/isAdmin');
const { isMongoId } = require('../Middlewares/validar-campos');

api.post('/new-album', ensureAuth, isAdmin, albumController.albumRegister);
api.put('/update-album/:id', ensureAuth, isAdmin, albumController.updateAlbum);
api.delete('/delete-album/:id', ensureAuth, isAdmin, albumController.deleteAlbum);
api.get('/artist-albums/:idArtist?', ensureAuth, albumController.findAlbum);
api.get('/album/:id', ensureAuth, albumController.findAlbumId);
api.get('/albums-page/:page?/:items?', ensureAuth, albumController.albumPaginate);


module.exports = api;