const Song = require('../../Models/song');
const Album = require('../../Models/album');
const { fileUpload } = require('../../Helpers/fileUpload');
const getMP3Duration = require('get-mp3-duration')
const fs = require('fs');

const songRegister = async(req, res) => {
    try {
        const validExtensions = ['mp3', 'm4a', 'mpeg']
        const binder = 'Songs';
        const params = req.body;
        if (params.number != null && params.name != null && params.album != null && params.number != "" && params.name != "" && params.album != "") {
            const song = await new Song(params);
            const songResult = await Song.find({ name: song.name, album: song.album });

            if (songResult.length) {

                return res.status(400).send({ message: 'La canción ya se encuentra registrada: ' + song.name });

            } else {
                if (!req.files) {
                    return res.status(400).send({ message: 'Falta el archivo de audio' });
                }
                const albumexists = await Album.findOne(song.album);
                if (!albumexists) {
                    return res.status(404).send({ message: 'El album no existe' });
                }
                const name = await fileUpload(req.files, validExtensions, binder);

                const buffer = await fs.readFileSync(`${binder}/${name}`);
                const duration = getMP3Duration(buffer);
                const minutes = (duration / (1000 * 60)).toFixed(1);
                song.file = name;
                song.duration = minutes;
                song.save();
                return res.status(200).send({ message: 'Canción registrada' })
            }
        } else {
            res.status(500).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' })

        }

    } catch (error) {
        res.send({ message: `${error}` })
    }
}

module.exports = {
    songRegister
}