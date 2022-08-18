const express = require('express');
const api = express.Router();
const { search } = require('../Controllers/searchController');
const { ensureAuth } = require('../Middlewares/authenticated');
api.get('/search/:query?', ensureAuth, search);
module.exports = api;