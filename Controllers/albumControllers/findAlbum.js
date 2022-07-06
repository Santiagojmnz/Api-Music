'use strict'
const Album = require('../../Models/album');

function findAlbum(req, res) {
    Album.find()
        .then(album => {
            if (album) {
                res.json(album)
            } else {
                res.status(500).send({ message: 'No se pudo cargar los Álbumes' })
            }
        })
};

function findAlbumId(req, res) {
    var albumId = req.params.id;
    Album.findById(albumId)
        .then(album => {
            if (album) {
                res.json(album)
            } else {
                res.status(500).send({ message: 'No se encontró el Álbum' })
            }
        })
}

module.exports = {
    findAlbum,
    findAlbumId
}