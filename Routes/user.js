'use strict'
const express = require('express');
const api = express.Router();
const userController = require('../Controllers/userControllers/index');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');




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
api.post('/update-password/:id', userController.changePassword);

api.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], userController.googleSignin);

module.exports = api;