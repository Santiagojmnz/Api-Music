const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}
const isEmail = (req, res, next) => {
    const { email } = req.body;
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        return res.status(400).send({ message: 'Ingresa un email válido' })

    }
    next()
}
const isMongoId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: 'MonngoId inválido' });
    }
    next()


}



module.exports = {
    validarCampos,
    isEmail,
    isMongoId
}