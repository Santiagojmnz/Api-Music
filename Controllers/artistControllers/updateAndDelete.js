'use strict'
const Artist = require('../../Models/artist');
const Album = require('../../Models/album');
const Song = require('../../Models/song');
const fs = require('fs')

function updateArtist(req, res) {
    try {
        const params = req.body;
        if (params.name != null && params.name != '' && params.description != null && params.description != '') {

            Artist.findByIdAndUpdate({ _id: req.params.id }, params)
                .then((artist) => {
                    if (artist) {
                        return res.status(200).send({ message: 'Artista actualizado' });
                    } else {
                        return res.status(404).send({ message: 'Artista no encontrado' });
                    }
                })

        } else {
            return res.status(500).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }

};

function deleteArtist(req, res) {
    try {
        Artist.findByIdAndDelete(req.params.id)
            .then((artist) => {

                if (artist) {

                    Album.find({ artist: req.params.id })
                        .then((albums) => {
                            albums.forEach((album) => {
                                Song.find({ album: album._id })
                                    .then((songs) => {
                                        songs.forEach((delsong) => {
                                            if (delsong.file) {
                                                const path = path.join(__dirname, '../../Songs/', delsong.file);
                                                const exists = fs.existsSync(path);
                                                if (exists) {
                                                    fs.unlinkSync('Songs/' + delsong.file)
                                                }
                                            }

                                        })
                                        Song.deleteMany({ album: album._id })
                                            .then((deletedSongs) => {})
                                    })

                            })
                            Album.deleteMany({ artist: req.params.id })
                                .then((deletedAs) => {
                                    if (deletedAs) {
                                        return res.status(200).send({ message: 'Artista eliminado' });
                                    } else {
                                        return res.status(500).send({ message: 'Problemas al eliminar al artista' });
                                    }
                                })
                        })

                } else {
                    return res.status(404).send({ message: 'Artista no encontrado' });
                }

            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' });
    }

}


module.exports = {
    updateArtist,
    deleteArtist
}