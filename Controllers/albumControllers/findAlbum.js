'use strict'
const Album = require('../../Models/album');

function findAlbum(req, res) {


    const { idArtist } = req.params;
    var find;
    try {

        if (idArtist) {
            find = Album.find({ artist: idArtist }).sort('year')

        } else {
            find = Album.find().sort('title')
        }
        find.populate('artist')
            .then(albums => {
                if (albums) {
                    res.status(200).send({ albums })
                } else {
                    res.status(404).send({ message: 'Sin álbumes' })
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }


};

function albumPaginate(req, res) {
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
            populate: 'artist',
        };
        Album.paginate({}, options)
            .then(albums => {
                if (albums) {
                    res.status(200).send({ albums })
                } else {
                    res.status(404).send({ message: 'Sin álbumes' })
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }

};

function findAlbumId(req, res) {
    try {

        Album.findById(req.params.id).populate('artist')
            .then((album) => {
                if (album) {
                    res.status(200).send({ album })
                } else {
                    res.status(404).send({ message: 'No se encontró el álbum' })
                }
            })

    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }

};


module.exports = {
    findAlbum,
    findAlbumId,
    albumPaginate
}