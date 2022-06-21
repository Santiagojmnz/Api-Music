'use strict'
const express = require('express');
const api = express.Router();
const userController = require('../Controllers/user')


api.post('/new-user', userController.addUsser);
api.get('/find-user', userController.findUser);
api.get('/find-user/:id', userController.findUserId);
api.put('/update-user/:id', userController.updateUser);
api.delete('/delete-user/:id', userController.deleteUser);

module.exports = api;