'use strict'
const express = require('express');
const api = express.Router();
const userController = require('../Controllers/user')


api.post('/new-user', userController.addUsser);

module.exports = api;