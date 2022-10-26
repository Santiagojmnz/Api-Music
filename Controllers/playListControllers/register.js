const PlayList = require('../../Models/playList');

const playListRegister = async(req, res) => {
    const params = req.body;
    params.user = req.user._id;
    try {
        if (params.name != null && params.name != "") {

            const playList = await new PlayList(params);
            PlayList.find({ user: playList.user, name: playList.name })
                .then((coincidence) => {
                    if (coincidence.length) {
                        return res.status(400).send({ message: 'Lista de reproducción existente' })
                    } else {
                        playList.save();
                        return res.status(200).send({ message: 'Lista de reproducción creada' });
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
    playListRegister
}