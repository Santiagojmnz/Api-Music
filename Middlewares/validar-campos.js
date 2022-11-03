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

const isValidImage = (req, res, next) => {
    const validExtensions = ['jpg', 'png', 'jpeg'];
    const { name } = req.files.file;
    const split = name.split('.');
    const extension = split[split.length - 1];
    if (!validExtensions.includes(extension)) {
        return res.status(400).send({ message: `Extensión inválida ${extension}, sólo se permiten archivos: jpg, png y jpeg` });

    }
    next();
}
const isValidSong = (req, res, next) => {
    const validExtensions = ['mp3', 'm4a'];
    if (req.files) {
        const { name } = req.files.file;
        const split = name.split('.');
        const extension = split[split.length - 1];
        if (!validExtensions.includes(extension)) {
            return res.status(400).send({ message: `Extensión inválida ${extension}, sólo se permiten archivos: mp3 y m4a` });

        }
    }

    next();
}
const isValidCollection = (req, res, next) => {
    const validCollection = ['albums', 'artists'];
    const { collection } = req.params;
    if (!validCollection.includes(collection)) {
        return res.status(400).send({ message: `Colección inválida: ${collection}, utiliza: albums o artists` });

    }
    next();
}
const isValidCollectionSearch = (req, res, next) => {
    const validCollection = ['albums', 'artists', 'songs'];
    const { collection } = req.params;
    if (!validCollection.includes(collection)) {
        return res.status(400).send({ message: `Colección inválida: ${collection}, utiliza: albums, artists o songs` });

    }
    next();
}


module.exports = {
    validarCampos,
    isEmail,
    isMongoId,
    isValidImage,
    isValidSong,
    isValidCollection,
    isValidCollectionSearch
}