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
        if (params.name != null && params.name != '' && params.number != null && params.number != '' && params.album != null && params.album != '') {

            const exists = Song.find({ _id: { $ne: req.params.id }, name: params.name, album: params.album })
            if (exists.length) {
                return res.status(500).send({ message: 'Canción existente' });
            }

            if (req.files) {
                Song.findById(req.params.id)
                    .then((songName) => {
                        if (songName.file) {
                            const path = path.join(__dirname, '../../Songs/', songName.file);
                            const exists = await fs.existsSync(path);
                            if (exists) {
                                fs.unlinkSync('Songs/' + songName.file)
                            }
                        }
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
                            return res.status(404).send({ message: 'Canción no encontrada' });
                        }
                    })
            }

        } else {
            return res.status(500).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }
};

async function deleteSong(req, res) {

    try {
        const song = await Song.findOne({ _id: req.params.id });
        if (song) {
            fs.unlinkSync('Songs/' + song.file);
            Song.findByIdAndDelete(req.params.id)
                .then(() => {
                    return res.status(200).send({ message: 'Canción eliminada' });
                })

        } else {
            return res.status(404).send({ message: 'Canción no encontrada' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }

}


module.exports = {
    updateSong,
    deleteSong
}