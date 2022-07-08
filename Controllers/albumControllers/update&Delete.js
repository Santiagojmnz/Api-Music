'use strict'
const Album = require('../../Models/album');

function updateAlbum(req, res) {
    const params = req.body;
    try {
        if (params.title != null && params.title != '' && params.description != null && params.description != '' && params.year != null && params.year != '' ) {
        
            Album.find({ _id: {$ne: req.params.id} , title: params.title })
                .then((exists) => {
                    if (exists.length) {
                        return res.status(500).send({ message: 'Estas duplicando un album' });
                    }
    
                    Album.findByIdAndUpdate({ _id: req.params.id }, params)
                        .then((user) => {
                            if (user) {
                                return res.status(200).send({ message: 'Album actualizado' });
                            } else {
                                return res.status(500).send({ message: 'Album no encontrado' });
                            }
    
                        }).catch((err) => {
                            return res.status(500).send({ message: 'Error al procesar la peticion' });
                        });
    
                })
    
        } else {
            res.status(500).send({ message: 'Por favor ingrese los campos obligatorios faltantes' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' + error });
    }
};

function deleteAlbum(req, res) {
    
    try {
        Album.findByIdAndDelete(req.params.id)
        .then((album) => {
            if (album) {
                res.status(200).send({ message: 'Album eliminado' });
            } else {
                res.status(500).send({ message: 'Problemas al eliminar el album' });
            }
        }).catch((err) => {
            res.status(500).send({ message: 'Album no encontrado' });

        });
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' + error });
    }
    
}

module.exports = {
    updateAlbum,
    deleteAlbum
}