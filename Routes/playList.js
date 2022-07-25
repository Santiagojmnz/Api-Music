const express = require('express');
const api = express.Router();
const { playListRegister } = require('../Controllers/playListControllers');
api.post('/new-playlist', playListRegister);



module.exports = api;