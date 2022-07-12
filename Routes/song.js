const express = require('express');
const api = express.Router();
const songController = require('../Controllers/songControllers');
const findSong = require('../Controllers/songControllers');
const findSongId = require('../Controllers/songControllers');
const songsPaginate = require('../Controllers/songControllers');

api.post('/new-song', songController.songRegister);
api.get('/find-songs', songController.findSong);
api.get('/find-song/:name', songController.findSongId);
api.get('/songs/:page', songController.songsPaginate);
module.exports = api;