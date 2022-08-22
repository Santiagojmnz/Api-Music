const express = require('express');
const api = express.Router();
const { addSong, deleteListSong } = require('../Controllers/listSongControllers');
const { ensureAuth } = require('../Middlewares/authenticated');

api.post('/add-song', ensureAuth, addSong);
api.delete('/quit-song/:id',ensureAuth, deleteListSong);



module.exports = api;