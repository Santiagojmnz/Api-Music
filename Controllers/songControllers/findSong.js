'use strict'
const Song = require('../../Models/song');
const path = require('path');
const mediaserver = require('mediaserver');

function findSong(req, res) {
    try{
        Song.find().populate('album')
        .then(song => {
            if (song) {
                res.json(song)
            } else {
                res.status(500).send({ message: 'No se pudo cargar las Canciones' })
            }
        })
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion: ' + error });
    }
  
};

function findSongId(req, res) {
    try{
        const { id } = req.body;
        Song.find(id)
        .then(song => {
            if(song) {
                const song = path.join(__dirname, '../../Uploads/songs', req.params.name )
                mediaserver.pipe(req, res, song);
            } else {
                res.status(500).send({ message: 'No se encontró la canción' })
            }
        })
   
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion: ' + error });
    }

};
function songsPaginate(req, res) {
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
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la peticion: ' + error });
    }
    
};


module.exports = {
    findSong,
    findSongId,
    songsPaginate
}