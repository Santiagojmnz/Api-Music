'use strict'
const User = require('../../Models/user');
const bcrypt = require('bcrypt');
const { uid } = require('uid/secure');
const { confirmEmail } = require('../../Utils/confirmEmail')
const { createToken } = require('../../Services/jwt');

function addUsser(req, res) {
    const user = new User(req.body);

    const params = req.body;

    if (params.name != null && params.surname != null && params.email != null && params.password != null) {

        const hash = bcrypt.hashSync(params.password, 10);
        const code = uid(25);
        const email = user.email;
        user.code = code;
        user.password = hash;
        const token = createToken({ code, email });
        User.find({ email: user.email })
            .then((emailUser) => {
                if (emailUser.length) {

                    return res.status(500).send({ message: 'El email ingresado ya se encuentra en uso: ' + user.email });

                } else {

                    user.save();
                    confirmEmail(user.name, user.surname, user.email, token);

                    return res.status(200).send({ message: 'Usuario registrado - Confirmar cuenta' })
                }

            })
    } else {
        res.status(500).send({ message: "Información incompleta" })

    }
};

function findUser(req, res) {
    User.find()
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(500).send({ message: 'No se pudieron cargar los usuarios' })
            }
        })
};

function findUserId(req, res) {
    var userId = req.params.id;
    User.findById(userId)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(500).send({ message: 'No se encontró el usuario' })
            }
        })
}

function updateUser(req, res) {
    const params = req.body;

    if (params.name != null && params.surname != null && params.email != null && params.password != null && params.role != null) {
        const hash = bcrypt.hashSync(params.password, 10);
        params.password = hash;
        User.find({ _id: { $ne: req.params.id }, email: params.email })
            .then((isEmail) => {
                if (isEmail.length) {

                    return res.status(500).send({ message: 'Email ingresado se encuentra en uso' });

                }

                User.findByIdAndUpdate({ _id: req.params.id }, params)
                    .then((user) => {
                        if (user) {
                            return res.status(200).send({ message: 'Usuario actualizado' });
                        } else {
                            return res.status(500).send({ message: 'Usuario no encontrado' });
                        }

                    }).catch((err) => {
                        return res.status(500).send({ message: 'Error al procesar la peticion' });

                    });


            })

    } else {
        res.status(500).send({ message: 'Por favor ingrese los campos obligatorios faltantes' })
    }
};

function deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
        .then((user) => {
            if (user) {
                res.status(200).send({ message: 'Cuenta eliminada' });
            } else {
                res.status(500).send({ message: 'Problemas al eliminar la cuenta' });
            }
        }).catch((err) => {
            res.status(500).send({ message: 'Cuenta no encontrada' });

        });
}


module.exports = {
    addUsser,
    findUser,
    findUserId,
    updateUser,
    deleteUser
}