const ListSong = require('../../Models/listSong');

function deleteListSong(req, res) {

    try {
        ListSong.findOne({ _id: req.params.id })
            .then((list) => {
                if (list) {
                    ListSong.findByIdAndDelete(req.params.id)
                        .then(() => {
                            return res.status(200).send({ message: 'Canción eliminada de la lista de reproducción' });
                        })
                } else {
                    return res.status(500).send({ message: 'Problemas al eliminar la canción de la lista de reproducción' });
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion ' + error });
    }

}


module.exports = {
    deleteListSong
}
