'use strict'
const Artist = require('../../Models/artist');


function findArtist(req, res) {
    try{
        Artist.find()
        .then(artist => {
            if (artist) {
                res.status(200).send({artist})
            } else {
                res.status(500).send({ message: 'No se pudieron cargar los artistas' })
            }
        })
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });

    }
   
};

function artistPaginate(req, res) {
    const {page} =req.params;
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
          };
        Artist.paginate({}, options)
            .then(artist => {
                if (artist) {
                    res.status(200).send({artist})
                } else {
                    res.status(500).send({ message: 'No se pudieron cargar los artistas' })
                }
            })
    }catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error });
    }
    
};


function findArtistId(req, res) {
    try {
        Artist.findOne({ _id: req.params.id})
        .then((artist)=>{
            if(artist){
                res.status(200).send({artist})
            }else{
                res.status(404).send({ message: 'No se encontró el álbum' })
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