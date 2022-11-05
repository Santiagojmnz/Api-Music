'use strict'
const Song = require('../../Models/song');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);
async function updateSong(req, res) {
    const { tempFilePath } = req.files.file;

    try {
        const params = req.body;
        if (params.name != null && params.name != '' && params.number != null && params.number != '' && params.album != null && params.album != '') {
            const exists = await Song.find({ _id: { $ne: req.params.id }, name: params.name, album: params.album })
            if (exists.length) {
                return res.status(400).send({ message: 'Canción existente' });
            }
            const song = await Song.findById({ _id: req.params.id })
            if (song) {
                if (req.files !== null) {
                    const fileSong = song.file.split('/');
                    const nombre = fileSong[fileSong.length - 1];
                    const [SongId] = nombre.split('.');
                    cloudinary.uploader.destroy(SongId, { resource_type: "video" });
                    const { duration, secure_url } = await cloudinary.uploader.upload(tempFilePath, { resource_type: "video" });
                    const time = (duration / 60000000000).toString();
                    const minuts = time.substring(0, 1);
                    const secondsM = time.substring(1, 4)
                    const seconds = Math.round(parseFloat(secondsM * 60));
                    if (seconds.toString().length > 1) {
                        const [second] = seconds.toString().split('.');
                        params.duration = minuts + ':' + second;
                    } else {
                        params.duration = minuts + ':0' + seconds;
                    }
                    params.file = secure_url;
                } else {
                    params.file = song.file;
                }
                Song.findByIdAndUpdate({ _id: req.params.id }, params)
                    .then((song) => {
                        return res.status(200).send({ message: 'Canción actualizada' });
                    })
            } else {
                return res.status(404).send({ message: 'Canción no encontrada' });
            }
        } else {
            return res.status(400).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }
};

async function deleteSong(req, res) {

    try {
        Song.findByIdAndDelete(req.params.id)
            .then((song) => {
                if (song) {
                    const fileSong = song.file.split('/');
                    const nombre = fileSong[fileSong.length - 1];
                    const [SongId] = nombre.split('.');
                    cloudinary.uploader.destroy(SongId, { resource_type: "video" });
                    return res.status(200).send({ message: 'Canción eliminada' });
                } else {
                    return res.status(404).send({ message: 'Canción no encontrada' });
                }

            })


    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }

}


module.exports = {
    updateSong,
    deleteSong
}