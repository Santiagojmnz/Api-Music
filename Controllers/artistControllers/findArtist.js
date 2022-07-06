'use strict'
const Artist = require('../../Models/artist');

function findArtist(req, res) {
    Artist.find()
        .then(artist => {
            if (artist) {
                res.json(artist)
            } else {
                res.status(500).send({ message: 'No se pudieron cargar los artistas' })
            }
        })
};

function findArtistId(req, res) {
    var artistId = req.params.id;
    Artist.findById(artistId)
        .then(artist => {
            if (artist) {
                res.json(artist)
            } else {
                res.status(500).send({ message: 'No se encontró el artista' })
            }
        })
}

module.exports = {
    findArtist,
    findArtistId
}