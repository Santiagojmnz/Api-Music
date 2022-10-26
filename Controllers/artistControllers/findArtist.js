'use strict'
const Artist = require('../../Models/artist');


function findArtist(req, res) {
    try {
        Artist.find()
            .then(artists => {
                if (artists) {
                    res.status(200).send({ artists })
                } else {
                    res.status(404).send({ message: 'Sin artistas' })
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });

    }

};

function artistPaginate(req, res) {
    const { page, items } = req.params;
    try {
        const myCustomLabels = {
            limit: 'false',
            totalDocs: 'false',
            totalPages: 'false',
            pagingCounter: 'false',
            hasPrevPage: 'false',
            hasNextPage: 'false',
        };
        const options = {
            page: page || 1,
            limit: items || 10,
            customLabels: myCustomLabels,
        };
        Artist.paginate({}, options)
            .then(artists => {
                if (artists) {
                    res.status(200).send({ artists })
                } else {
                    res.status(500).send({ message: 'Sin artistas' })
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }

};


function findArtistId(req, res) {
    try {
        Artist.findById({ _id: req.params.id })
            .then((artist) => {
                if (artist) {
                    res.status(200).send({ artist })
                } else {
                    res.status(404).send({ message: 'No se encontró el artista' })
                }
            })

    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }

};

module.exports = {
    findArtist,
    findArtistId,
    artistPaginate
}