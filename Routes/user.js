'use strict'
const express = require('express');
const api = express.Router();
const userController = require('../Controllers/userControllers/index');
const { check } = require('express-validator');
const { validarCampos, isEmail, isMongoId } = require('../Middlewares/validar-campos');
const { ensureAuth } = require('../Middlewares/authenticated');
const { isAdmin } = require('../Middlewares/isAdmin');



api.post('/new-user', isEmail, userController.addUser);
api.get('/user', ensureAuth, isAdmin, userController.findUser);
api.get('/user/:id', ensureAuth, isMongoId, userController.findUserId);
api.put('/update-user/:id', ensureAuth, isEmail, isMongoId, userController.updateUser);
api.delete('/delete-user/:id', ensureAuth, isAdmin, isMongoId, userController.deleteUser);
api.get('/verify-account/:token', userController.confirmEmail);
api.post('/login', userController.login);
api.post('/restore-password', isEmail, userController.resetContrasena);
api.post('/validate-token', userController.validarToken);
api.post('/update-password', userController.guardarNuevaContrasena);
api.get('/suspend-account/:id', ensureAuth, isMongoId, userController.suspenderCuenta);
api.post('/update-password/:id', ensureAuth, isMongoId, userController.changePassword);

api.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], userController.googleSignin);

module.exports = api;