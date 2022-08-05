const express = require('express');
const api = express.Router();
const { search } = require('../Controllers/searchController');
api.get('/search/:query?', search);
module.exports = api;