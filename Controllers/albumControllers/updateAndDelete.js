'use strict'
const Album = require('../../Models/album');
const Song = require('../../Models/song');
const fs = require('fs')

function updateAlbum(req, res) {
    try {
    const params = req.body;
        if (params.title != null && params.title != '' && params.description != null && params.description != '' && params.year != null && params.year != '' && params.artist != null && params.artist != '') {

            Album.find({ title: params.title, artist: req.params.artist })
                .then((exists) => {
                    if (exists.length) {
                        return res.status(500).send({ message: 'Estas duplicando un álbum' });
                    }

                    Album.findByIdAndUpdate({ _id: req.params.id }, params)
                        .then((album) => {
                            if (album) {
                                return res.status(200).send({ message: 'Álbum actualizado' });
                            } else {
                                return res.status(404).send({ message: 'Álbum no encontrado' });
                            }

                        })

                })

        } else {
            return res.status(500).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }
};

function deleteAlbum(req, res) {

    try {
        Album.findByIdAndDelete(req.params.id)
            .then((album) => {

                if (album) {
                    Song.find({album: req.params.id})
                    .then((songs) => {
                        songs.forEach((delsong) => {
                            if (delsong.file) {
                                const path = path.join(__dirname, '../../Songs/', delsong.file);
                                const exists = fs.existsSync(path);
                                if (exists) {
                                    fs.unlinkSync('Songs/' + delsong.file)
                                }
                            }
                        })
                    })
                    Song.deleteMany({ album: req.params.id })
                        .then((deltedSg) => {
                            if (deltedSg) {
                                return res.status(200).send({ message: 'Álbum eliminado' });
                            } else {
                                return res.status(500).send({ message: 'Problemas al eliminar el álbum' });
                            }
                        })
                } else {
                    return res.status(404).send({ message: 'Álbum no encontrado' });
                }
            })
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }

}

module.exports = {
    updateAlbum,
    deleteAlbum
}