const express = require('express');
const api = express.Router();
const { search, directedSearch } = require('../Controllers/searchController');
const { ensureAuth } = require('../Middlewares/authenticated');
const { isValidCollectionSearch } = require('../Middlewares/validar-campos.js');
api.get('/search/:query?', ensureAuth, search);
api.get('/search/:collection/:query?', isValidCollectionSearch, ensureAuth, directedSearch);
module.exports = api;