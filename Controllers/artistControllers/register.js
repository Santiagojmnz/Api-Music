const Artist = require('../../Models/artist');

const artistRegister = async(req, res) => {
    const params = req.body;
    try {


        if (params.name != null && params.description != null) {
            const artist = await new Artist(req.body);
            Artist.find({ name: artist.name })
                .then((coincidence) => {

                    if (coincidence.length) {
                        return res.status(500).send({ message: 'El artista ya se encuentra registrado: ' + artist.name });
                    } else {
                        artist.save();
                        return res.status(200).send({ message: 'Artista registrado' })
                    }

                })
        } else {
            res.status(500).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' })

        }


    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }




}
module.exports = {
    artistRegister
}