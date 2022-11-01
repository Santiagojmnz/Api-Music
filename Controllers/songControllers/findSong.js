'use strict'
const Song = require('../../Models/song');
const path = require('path');
const fs = require('fs');

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

function getSongFile(req, res) {
    const { file } = req.params;
    try {
        Song.findOne({ file: file })
            .then(async(song) => {
                const pathFile = path.join(__dirname, '../../Songs', file)
                const exists = await fs.existsSync(pathFile);
                if (exists) {
                    res.sendFile(pathFile)
                } else {
                    res.status(404).send({ message: 'No se encontró la canción' })
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
    getSongFile,
    songsPaginate
}