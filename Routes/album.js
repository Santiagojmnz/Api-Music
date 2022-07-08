const express = require('express');
const api = express.Router();
const albumController = require('../Controllers/albumControllers/index');

api.post('/new-album', albumController.albumRegister);
module.exports = api;