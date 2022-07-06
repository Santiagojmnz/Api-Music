const express = require('express');
const api = express.Router();
const artistController = require('../Controllers/artistControllers/index');





api.post('/new-artist', artistController.artistRegister);
api.get('/find-artist', artistController.findArtist);
api.get('/find-artist/:id', artistController.findArtistId);
api.get('/artist', artistController.artistPaginate);

module.exports = api;