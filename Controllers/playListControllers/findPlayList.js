'use strict'
const PlayList = require('../../Models/playList');

function findPlayList(req, res) {
    try{
        PlayList.find().populate('user')
        .then(playList => {
            if (playList) {
                res.json(playList)
            } else {
                res.status(500).send({ message: 'No se pudieron cargar las listas de reproducción' })
            }
        })
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }
  
};


function findPlayListId(req, res) {
    try{
        var playListId = req.params.id;
        PlayList.findById(playListId).populate('user')
            .then(playList => {
                if (playList) {
                    res.json(playList)
                } else {
                    res.status(404).send({ message: 'No se encontró la lista de reproducción' })
                }
            })
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });

    }
    }
    

module.exports = {
    findPlayList,
    findPlayListId,
}