const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../Models/user');
const { tokenData } = require('../Services/jwt')
exports.ensureAuth = async(req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).send({ message: 'La petición no tiene la cabecera de autenticación' });
    }

    try {
        const payload = await tokenData(token);
        const user = await User.findById(payload.data)
        req.user = user;
        next();


    } catch (error) {
        if (error.message === "jwt expired") {
            return res.status(401).send({ message: 'Token expirado' });
        }
        return res.status(401).send({ message: 'Token no válido' });

    }


};