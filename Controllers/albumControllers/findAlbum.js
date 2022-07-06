'use strict'
const Album = require('../../Models/album');
const Artist = require('../../Models/artist');

function findAlbum(req, res) {
    try{
        Album.find().populate('artist')
        .then(album => {
            if (album) {
                res.json(album)
            } else {
                res.status(500).send({ message: 'No se pudo cargar los Álbumes' })
            }
        })
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion: ' + error });
    }
  
};
function albumPaginate(req, res) {
    try{
        const myCustomLabels = {
            limit: 'false',
            pagingCounter: 'false',
            hasPrevPage: 'false',
            hasNextPage: 'false',
            prevPage: 'false',
            nextPage: 'false',
          };
          const options = {
            page: req.query.page || 1,
            customLabels: myCustomLabels,
            populate: 'artist',
          };
        Album.paginate({}, options)
            .then(album => {
                if (album) {
                    res.json(album)
                } else {
                    res.status(500).send({ message: 'No se pudieron cargar los álbum' })
                }
            })
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion: ' + error });
    }
    
};

function findAlbumId(req, res) {
    try{
        var albumId = req.params.id;
        Album.findById(albumId).populate('artist')
            .then(album => {
                if (album) {
                    res.json(album)
                } else {
                    res.status(500).send({ message: 'No se encontró el Álbum' })
                }
            })
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion: ' + error });

    }
    }
    

module.exports = {
    findAlbum,
    findAlbumId,
    albumPaginate
}