const ListSong = require('../../Models/listSong');

function deleteListSong(req, res) {

    try {
        ListSong.findOne({ _id: req.params.id })
            .then((list) => {
                if (list) {
                    ListSong.findByIdAndDelete(req.params.id)
                        .then(() => {
                            return res.status(200).send({ message: 'Canción eliminada' });
                        })
                } else {
                    return res.status(500).send({ message: 'Canción no encontrada' });
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' + error });
    }

}


module.exports = {
    deleteListSong
}
