const Song = require('../../Models/song');
const { fileUpload } = require('../../Helpers/fileUpload');
const getMP3Duration = require('get-mp3-duration')
const fs = require('fs');

const songRegister = async(req, res) => {
    try {
    const param = req.files.file;
    const validExtensions = ['mp3', 'm4a', 'mpeg']
    const binder = 'Songs';
    const params = req.body;
        if (params.number != null && params.name != null && params.album != null) {
            const song = await new Song(params);
            const songResult = await Song.find({ name: song.name, album: song.album });

            if (songResult.length) {

                return res.status(500).send({ message: 'La canción ya se encuentra registrada: ' + song.name });

            } else {
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