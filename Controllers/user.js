'use strict'
const User = require('../Models/user');
const bcrypt = require('bcrypt');

function addUsser(req, res) {
    const user = new User(req.body);
    const params = req.body;
    user.role = "user";
    if (params.name != null && params.surname != null && params.email != null && params.password != null) {

        const hash = bcrypt.hashSync(params.password, 10);
        user.password = hash;
        User.find({ email: user.email })
            .then((emailUser) => {
                if (emailUser.length) {

                    return res.status(500).send({ message: 'El email ingresado ya se encuentra en uso: ' + user.email });

                } else {
                    user.save();
                    return res.status(200).send({ message: 'Usuario registrado' })
                }

            })
    } else {
        res.status(500).send({ message: "Información incompleta" })

    }
}
module.exports = {
    addUsser
}