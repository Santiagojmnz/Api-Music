'use strict'
const Song = require('../../Models/song');
const fs = require('fs')
const { fileUpload } = require('../../Helpers/fileUpload');
const getMP3Duration = require('get-mp3-duration')

async function updateSong(req, res) {
    try {
    const params = req.body;
    const binder = 'Songs';
    const validExtensions = ['mp3', 'm4a', 'mpeg'];
        if (params.name != null && params.name != '') {

            const exists = Song.find({ _id: { $ne: req.params.id }, name: params.name, album: params.album })
            if (exists.length) {
                return res.status(500).send({ message: 'Esa canción ya existe' });
            }

            if (req.files) {
                Song.findById(req.params.id)
                    .then((songName) => {
                        fs.unlinkSync('Songs/' + songName.file)
                    });
                const file = req.files.file;
                const name = await fileUpload(req.files, validExtensions, binder, file);
                const buffer = await fs.readFileSync('Songs/' + name);
                const duration = getMP3Duration(buffer);
                const minutes = (duration / (1000 * 60)).toFixed(1);
                params.file = name;
                params.duration = minutes;
                Song.findByIdAndUpdate({ _id: req.params.id }, params)
                    .then((song) => {
                        if (song) {
                            return res.status(200).send({ message: 'Canción actualizada' });
                        } else {
                            return res.status(500).send({ message: 'Canción no encontrada' });
                        }
                    })
            } else {
                Song.findByIdAndUpdate({ _id: req.params.id }, params)
                    .then((song) => {
                        if (song) {
                            return res.status(200).send({ message: 'Canción actualizada' });
                        } else {
                            return res.status(500).send({ message: 'Canción no encontrada' });
                        }
                    })
            }

        } else {
            return res.status(500).send({ message: 'Por favor ingrese los campos obligatorios faltantes' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' + error });
    }
};

async function deleteSong(req, res) {

    try {
        const song = Song.findOne({ _id: req.params.id })
                if (song) {
                    fs.unlink('Songs/' + song.file);
                    Song.findByIdAndDelete(req.params.id)
                        .then(() => {
                            return res.status(200).send({ message: 'Canción eliminada' });
                        })

                } else {
                    return res.status(500).send({ message: 'Canción no encontrada' });
                }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' + error });
    }

}


module.exports = {
    updateSong,
    deleteSong
}