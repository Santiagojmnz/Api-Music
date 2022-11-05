const Song = require('../../Models/song');
const Album = require('../../Models/album');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);

const songRegister = async(req, res) => {
    const { tempFilePath } = req.files.file;
    const params = req.body;
    console.log(tempFilePath)
    try {

        if (params.number != null && params.name != null && params.album != null && params.artist != null && params.number != "" && params.name != "" && params.album != "" && params.artist != "") {
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
                const { duration, secure_url } = await cloudinary.uploader.upload(tempFilePath, { resource_type: "video" });
                const time = (duration / 60000000000).toString();
                const minuts = time.substring(0, 1);
                const secondsM = time.substring(1, 4)
                const seconds = parseFloat(secondsM * 60);
                if (seconds.toString().length > 1) {
                    const [second] = seconds.toString().split('.');

                    song.duration = minuts + ':' + second;
                } else {
                    song.duration = minuts + ':0' + seconds;
                }
                song.file = secure_url;
                song.save();
                return res.status(200).send({ message: 'Canción registrada' })
            }
        } else {
            return res.status(500).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' })

        }

    } catch (error) {
        return res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }
}

module.exports = {
    songRegister
}