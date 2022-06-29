'use strict'
const express = require('express');
const api = express.Router();
const userController = require('../Controllers/userControllers/index')


api.post('/new-user', userController.addUsser);
api.get('/find-user', userController.findUser);
api.get('/find-user/:id', userController.findUserId);
api.put('/update-user/:id', userController.updateUser);
api.delete('/delete-user/:id', userController.deleteUser);
api.get('/verify-account/:token', userController.confirmEmail);
api.post('/login', userController.login);
api.post('/restore-password', userController.resetContrasena);
api.post('/validate-token', userController.validarToken);
api.post('/update-password', userController.guardarNuevaContrasena);
api.get('/suspend-account/:_id', userController.suspenderCuenta);

module.exports = api;