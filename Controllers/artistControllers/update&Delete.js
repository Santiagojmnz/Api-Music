'use strict'
const Artist = require('../../Models/artist');
const Album = require('../../Models/album');

function updateArtist(req, res) {
    const params = req.body;
    try {
        if (params.name != null && params.name != '' && params.description != null && params.description != '') {

            Artist.findByIdAndUpdate({ _id: req.params.id }, params)
                .then((user) => {
                    if (user) {
                        return res.status(200).send({ message: 'Artista actualizado' });
                    } else {
                        return res.status(500).send({ message: 'Artista no encontrado' });
                    }
                }).catch((err) => {
                    return res.status(500).send({ message: 'Error al procesar la peticion' });
                });

        } else {
            return res.status(500).send({ message: 'Por favor ingrese los campos obligatorios faltantes' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' + error });
    }

};

function deleteArtist(req, res) {
    try {
        Artist.findByIdAndDelete(req.params.id)
            .then((artist) => {

                if (artist) {
                    Album.deleteMany({ artist: req.params.id })
                        .then((deltedAs) => {
                            if (deltedAs) {
                                return res.status(200).send({ message: 'Artista eliminado' });
                            } else {
                                return res.status(500).send({ message: 'Problemas al eliminar al artista' });
                            }
                        }).catch((err) => {
                            return res.status(500).send({ message: 'Problemas al eliminar al artista' });

                        });
                    // return res.status(200).send({ message: 'Artista eliminado' });

                } else {
                    return res.status(500).send({ message: 'Artista no encontrado' });
                }
                
            }).catch((err) => {
                res.status(500).send({ message: 'Problemas al eliminar al artista' });
            });
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' });
    }

}


module.exports = {
    updateArtist,
    deleteArtist
}