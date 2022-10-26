const express = require('express');
const api = express.Router();
const artistController = require('../Controllers/artistControllers/index');
const { ensureAuth } = require('../Middlewares/authenticated');
const { isAdmin } = require('../Middlewares/isAdmin');
api.post('/new-artist', ensureAuth, isAdmin, artistController.artistRegister);
api.put('/update-artist/:id', ensureAuth, isAdmin, artistController.updateArtist);
api.delete('/delete-artist/:id', ensureAuth, isAdmin, artistController.deleteArtist);
api.get('/artists', ensureAuth, artistController.findArtist);
api.get('/artist/:id', ensureAuth, artistController.findArtistId);
api.get('/artists-page/:page?/:items?', ensureAuth, artistController.artistPaginate);

module.exports = api;