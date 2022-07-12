const express = require('express');
const api = express.Router();
const songController = require('../Controllers/songControllers');

api.post('/new-song', songController.songRegister);
module.exports = api;