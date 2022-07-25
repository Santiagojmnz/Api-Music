const express = require('express');
const api = express.Router();
const { addSong } = require('../Controllers/listSongControllers');
api.post('/add-song', addSong);



module.exports = api;