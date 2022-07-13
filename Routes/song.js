const express = require('express');
const api = express.Router();
const songController = require('../Controllers/songControllers');

api.post('/new-song', songController.songRegister);
api.put('/update-song/:id', songController.updateSong);
api.delete('/delete-song/:id', songController.deleteSong);
api.get('/find-songs', songController.findSong);
api.get('/find-song/:name', songController.findSongId);
api.get('/songs/:page', songController.songsPaginate);
module.exports = api;