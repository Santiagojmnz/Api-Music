'use strict'
const Album = require('../../Models/album');
const Song = require('../../Models/song');
const fs = require('fs')

function updateAlbum(req, res) {
    try {
    const params = req.body;
        if (params.title != null && params.title != '' && params.description != null && params.description != '' && params.year != null && params.year != '' && params.artist != null && params.artist != '') {

            Album.find({ title: params.title, artist: req.params.artist })
                .then((exists) => {
                    if (exists.length) {
                        return res.status(500).send({ message: 'Estas duplicando un album' });
                    }

                    Album.findByIdAndUpdate({ _id: req.params.id }, params)
                        .then((album) => {
                            if (album) {
                                return res.status(200).send({ message: 'Album actualizado' });
                            } else {
                                return res.status(500).send({ message: 'Album no encontrado' });
                            }

                        })

                })

        } else {
            return res.status(500).send({ message: 'Por favor ingrese los campos obligatorios faltantes' });
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
                    Song.find({album: req.params.id})
                    .then((songs) => {
                        songs.forEach((delsong) => {
                            fs.unlinkSync('Songs/' + delsong.file)
                        })
                    })
                    Song.deleteMany({ album: req.params.id })
                        .then((deltedSg) => {
                            if (deltedSg) {
                                return res.status(200).send({ message: 'Album eliminado' });
                            } else {
                                return res.status(500).send({ message: 'Problemas al eliminar el album' });
                            }
                        })
                } else {
                    return res.status(500).send({ message: 'Problemas al eliminar el album' });
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' + error });
    }

}

module.exports = {
    updateAlbum,
    deleteAlbum
}