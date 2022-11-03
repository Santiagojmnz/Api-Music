'use strict'
const Album = require('../../Models/album');
const Song = require('../../Models/song');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);

function updateAlbum(req, res) {
    try {
        const params = req.body;
        if (params.title != null && params.title != '' && params.gender != null && params.gender != '' && params.description != null && params.description != '' && params.year != null && params.year != '' && params.artist != null && params.artist != '') {

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
                    Song.find({ album: req.params.id })
                        .then((songs) => {
                            songs.forEach(async(delsong) => {
                                if (delsong.file) {
                                    const fileSong = delsong.file.split('/');
                                    const nombre = fileSong[fileSong.length - 1];
                                    const [SongId] = nombre.split('.');
                                    await cloudinary.uploader.destroy(SongId, { resource_type: "video" });
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