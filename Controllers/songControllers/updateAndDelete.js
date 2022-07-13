'use strict'
const Song = require('../../Models/song');
const fs = require('fs').promises

function updateSong(req, res) {
    const params = req.body;
    try {
        if (params.name != null && params.name != '') {

            Song.find({_id: {$ne: req.params.id}, name: params.name, album: params.album })
                .then((exists) => {
                    if (exists.length) {
                        return res.status(500).send({ message: 'Esa canción ya existe' });
                    }

                    Song.findByIdAndUpdate({ _id: req.params.id }, params)
                        .then((song) => {
                            if (song) {
                                return res.status(200).send({ message: 'Canción actualizada' });
                            } else {
                                return res.status(500).send({ message: 'Canción no encontrada' });
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

function deleteSong(req, res) {

    try {
        Song.findOne({ _id: req.params.id })
            .then((song) => {
                if (song) {
                    fs.unlink('Uploads/songs/' + song.file)
                        .then(() => {
                            Song.findByIdAndDelete(req.params.id)
                                .then(() => {
                                    return res.status(200).send({ message: 'Canción eliminada' });
                                })
                        })

                } else {
                    return res.status(500).send({ message: 'Canción no encontrada' });
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' + error });
    }

}


module.exports = {
    updateSong,
    deleteSong
}