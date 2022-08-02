const express = require('express');
const api = express.Router();
const { playListRegister, updatePList, deletePlayList, findPlayList, findPlayListId } = require('../Controllers/playListControllers');
const { ensureAuth } = require('../Middlewares/authenticated');

api.post('/new-playlist', ensureAuth, playListRegister);
api.put('/update-play-list/:id', ensureAuth, updatePList);
api.delete('/delete-playlist/:id', ensureAuth, deletePlayList);
api.get('/playlist', ensureAuth, findPlayList);
api.get('/playlist/:id', ensureAuth, findPlayListId);



module.exports = api;