'use strict'
const Song = require('../../Models/song');

function findSong(req, res) {
    try {
        Song.find().populate('album')
            .then(song => {
                if (song) {
                    res.json(song)
                } else {
                    res.status(500).send({ message: 'No se pudo cargar las canciones' })
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }

};

function getSongs(req, res) {
    const { id, collection } = req.params;
    var find;
    try {

        if (collection == "albums") {
            find = Song.find({ album: id }).sort('number')

        } else {
            find = Song.find({ artist: id }).sort('name')
        }
        find.then(songs => {
            if (songs) {
                res.status(200).send({ songs })
            } else {
                res.status(404).send({ message: 'Sin canciones' })
            }
        })

    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }


};


function songsPaginate(req, res) {
    const { page } = req.params;
    try {
        const myCustomLabels = {
            limit: 'false',
            pagingCounter: 'false',
            hasPrevPage: 'false',
            hasNextPage: 'false',
            prevPage: 'false',
            nextPage: 'false',
        };
        const options = {
            page: page || 1,
            customLabels: myCustomLabels,
            populate: 'album',
        };
        Song.paginate({}, options)
            .then(song => {
                if (song) {
                    res.json(song)
                } else {
                    res.status(500).send({ message: 'No se pudieron cargar las canciones' })
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }

};


module.exports = {
    findSong,
    songsPaginate,
    getSongs
}