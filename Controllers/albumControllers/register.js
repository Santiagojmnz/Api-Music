const Album = require('../../Models/album');


const albumRegister = async(req, res) => {

    try {
        const params = req.body;

        if (params.title != null && params.gender != null && params.description != null && params.year != null && params.artist != null) {
            if (isNaN(params.year)) {
                return res.status(500).send({ message: 'El año ingresado no es válido: ' + params.year })
            } else {
                const album = await new Album(req.body);

                Album.find({ title: album.title, artist: album.artist })
                    .then((coincidence) => {

                        if (coincidence.length) {
                            return res.status(500).send({ message: 'El álbum ya se encuentra registrado: ' + album.title });
                        } else {
                            album.save();
                            return res.status(200).send({ message: 'Album registrado' })
                        }

                    })
            }

        } else {
            res.status(500).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' })


        }


    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });

    }


}
module.exports = {
    albumRegister
}