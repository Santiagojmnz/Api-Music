'use strict'
const User = require('../../Models/user');
const bcrypt = require('bcrypt');
const { uid } = require('uid/secure');
const { confirmEmail } = require('../../Utils/confirmEmail')
const { createToken } = require('../../Services/jwt');
const mongoose = require('mongoose');

function addUser(req, res) {


    try {
        const user = new User(req.body);
        const params = req.body;

        if (params.name != null && params.surname != null && params.email != null && params.password != null && params.name != '' && params.surname != '' && params.email != '' && params.password != '') {

            const hash = bcrypt.hashSync(params.password, 10);
            const code = uid(25);
            const email = user.email;
            user.code = code;
            user.password = hash;

            const token = createToken({ code, email });
            User.find({ email: user.email })
                .then((emailUser) => {
                    if (emailUser.length) {

                        return res.status(400).send({ message: 'El email ingresado ya se encuentra en uso: ' + user.email });

                    } else {

                        user.save();
                        confirmEmail(user.name, user.surname, user.email, token);

                        return res.status(200).send({ message: 'Usuario registrado - Confirmar cuenta' });
                    }

                })


        } else {
            res.status(400).send({ message: "Por favor ingrese los campos obligatorios (*) faltantes" });

        }

    } catch (error) {
        res.status(500).send({ message: "Error al procesar la peticion ", error });
    }

};

function findUser(req, res) {
    try {
        User.find({})
            .then(users => {
                if (users) {
                    res.status(200).send({ users });
                } else {
                    res.status(404).send({ message: 'No se encontraron usuarios' });
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion', error });
    }

};

function findUserId(req, res) {
    try {
        var id = req.params.id;

        User.findById(id)
            .then((user) => {
                if (user) {
                    return res.status(200).send({ user });
                } else {
                    return res.status(404).send({ message: 'El usuario no existe' });
                }
            })


    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion', error });
    }

}

function updateUser(req, res) {
    try {
        const params = req.body;

        if (params.name != "" && params.surname != "" && params.email != "" && params.name != null && params.surname != null && params.email != null) {

            if (params.password) {
                const hash = bcrypt.hashSync(params.password, 10);
                params.password = hash;
            } else {
                delete params.password;
            }

            User.find({ _id: req.params.id }).then((user) => {

                if (user.length) {
                    User.find({ _id: { $ne: req.params.id }, email: params.email })
                        .then((isEmail) => {
                            if (isEmail.length) {

                                return res.status(400).send({ message: 'El email ingresado ya se encuentra en uso' });

                            }

                            User.findByIdAndUpdate({ _id: req.params.id }, params)
                                .then((user) => {
                                    return res.status(200).send({ message: 'Usuario actualizado', user });
                                })

                        })

                } else {
                    return res.status(404).send({ message: 'El usuario no existe' });

                }
            })





        } else {
            return res.status(400).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' })
        }

    } catch (error) {
        return res.status(500).send({ message: 'Error al procesar la petición' + error });
    }

};

function deleteUser(req, res) {
    try {

        User.findByIdAndDelete(req.params.id)
            .then((user) => {
                if (user) {
                    res.status(200).send({ message: 'Cuenta eliminada' });
                } else {
                    res.status(404).send({ message: 'Cuenta no encontrada' });
                }
            })
    } catch (err) {
        res.status(500).send({ message: 'Problemas al eliminar la cuenta' });

    };
}


module.exports = {
    addUser,
    findUser,
    findUserId,
    updateUser,
    deleteUser
}