const express = require('express');
const api = express.Router();
const artistController = require('../Controllers/artistControllers/index');





api.post('/new-artist', artistController.artistRegister);
api.put('/update-artist/:id', artistController.updateArtist);
api.delete('/delete-artist/:id', artistController.deleteArtist);
api.get('/find-artist', artistController.findArtist);
api.get('/find-artist/:id', artistController.findArtistId);
api.get('/artists/:page', artistController.artistPaginate);

module.exports = api;