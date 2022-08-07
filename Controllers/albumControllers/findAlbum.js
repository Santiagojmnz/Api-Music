'use strict'
const Album = require('../../Models/album');

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
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }
  
};
function albumPaginate(req, res) {
    const {page} = req.params;
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
            page: page || 1,
            customLabels: myCustomLabels,
            populate: 'artist',
          };
        Album.paginate({}, options)
            .then(album => {
                if (album) {
                    res.json(album)
                } else {
                    res.status(500).send({ message: 'No se pudieron cargar los álbumes' })
                }
            })
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
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
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });

    }
    }
    

module.exports = {
    findAlbum,
    findAlbumId,
    albumPaginate
}