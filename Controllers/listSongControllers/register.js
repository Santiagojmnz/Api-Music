const ListSong = require('../../Models/listSong');

const addSong = async(req, res) => {
    const params = req.body;

    try {
        if (params.playlist != null && params.song != null && params.playlist != "" && params.song != "") {
            const toList = await new ListSong(params);
            ListSong.find({ playlist: params.playlist, song: params.song })
                .then((coincidence) => {
                    if (coincidence.length) {
                        return res.status(500).send({ message: 'La canción ya se encuentra listada' })
                    } else {
                        toList.save();
                        return res.status(200).send({ message: 'Canción listada' });
                    }

                })
        } else {
            res.status(400).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' })

        }

    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });

    }
}
module.exports = {
    addSong
}