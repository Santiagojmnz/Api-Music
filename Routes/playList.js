const express = require('express');
const api = express.Router();
const { playListRegister } = require('../Controllers/playListControllers');
const { ensureAuth } = require('../Middlewares/authenticated');

api.post('/new-playlist', ensureAuth, playListRegister);



module.exports = api;