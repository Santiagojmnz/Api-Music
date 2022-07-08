const express = require('express');
const api = express.Router();
const artistController = require('../Controllers/artistControllers/index');





api.post('/new-artist', artistController.artistRegister);

module.exports = api;