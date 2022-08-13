const PlayList = require('../../Models/playList');
const ListSong = require('../../Models/listSong');

function updatePList(req, res) {
    try {
        const params = req.body;
        if (params.user != null && params.user != "" && params.name != null && params.name != '') {

            const exists = PlayList.find({ _id: { $ne: req.params.id }, name: params.name, user: params.user })
            if (exists.length) {
                return res.status(400).send({ message: 'Lista de reproducción existente' });
            }

            PlayList.findByIdAndUpdate({ _id: req.params.id }, params)
                .then((listUpdated) => {
                    if (listUpdated) {
                        return res.status(200).send({ message: 'Lista de reproducción actualizada' });
                    } else {
                        return res.status(404).send({ message: 'Lista de reproducción no encontrada' });
                    }
                })

        } else {
            return res.status(500).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }
};

function deletePlayList(req, res) {
    try {
    const id = req.params.id;
        PlayList.findOne({ _id: id })
            .then((list) => {
                if (list) {
                    ListSong.find({ playlist: id })
                        .then((songs) => {
                            ListSong.deleteMany({ playlist: id })
                                .then((deletedSongs) => {
                                })
                        })
                    PlayList.findByIdAndDelete(req.params.id)
                        .then(() => {
                            return res.status(200).send({ message: 'Lista de reproducción eliminada' });
                        })
                } else {
                    return res.status(404).send({ message: 'Lista de reproducción no encontrada' });
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }

}


module.exports = {
    updatePList,
    deletePlayList
}