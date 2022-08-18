const express = require('express');
const api = express.Router();
const { playListRegister, updatePList, deletePlayList, findPlayList, findPlayListId } = require('../Controllers/playListControllers');
const { ensureAuth } = require('../Middlewares/authenticated');
const {isMongoId} = require('../Middlewares/validar-campos');

api.post('/new-playlist', ensureAuth, playListRegister);
api.put('/update-play-list/:id', ensureAuth,isMongoId, updatePList);
api.delete('/delete-playlist/:id', ensureAuth,isMongoId, deletePlayList);
api.get('/playlist', ensureAuth, findPlayList);
api.get('/playlist/:id', ensureAuth,isMongoId, findPlayListId);



module.exports = api;