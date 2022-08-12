const Album = require('../../Models/album');
const Artist = require('../../Models/artist');
const User = require('../../Models/user');
const { fileUpload } = require('../../Helpers/fileUpload');
const fs = require('fs');
const path = require('path')


const uploadImage = async(req, res) => {
    const validCollection = ['albums', 'artists'];
    const validExtensions = ['jpg', 'png', 'jpeg'];
    const binder = 'Images';

    const { id, collection } = req.params;

    try {

        if (validCollection.includes(collection)) {
            const name = await fileUpload(req.files, validExtensions, binder);


            if (collection == 'artists') {
                const artist = await Artist.findByIdAndUpdate(id);

                if (artist) {
                    if (artist.image) {
                        const pathImage = path.join(__dirname, '../../Images/', artist.image);
                        const exists = await fs.existsSync(pathImage);
                        if (exists) {
                            await fs.unlinkSync(pathImage);
                        }
                    }
                    artist.image = name;
                    artist.save();
                    return res.status(200).send({ message: 'Imagen actualizada' });
                } else {
                    return res.status(404).send({ message: 'El artista no existe' });
                }
            } else {
                const album = await Album.findByIdAndUpdate(id);
                if (album) {
                    if (album.image) {
                        const pathImage = path.join(__dirname, '../../Images/', album.image);
                        const exists = await fs.existsSync(pathImage);
                        if (exists) {
                            await fs.unlinkSync(pathImage);
                        }

                    }
                    album.image = name;
                    album.save();
                    return res.status(200).send({ message: 'Imagen actualizada' });
                } else {
                    return res.status(404).send({ message: 'El álbum no existe' });
                }
            }

        } else {
            return res.status(400).send({ message: `Colección inválida: ${collection}, utiliza: ${validCollection}` });

        }

    } catch (error) {

        return res.status(500).send({ message: 'Error al procesar la petición: ' + error });

    }
}

const uploadImageUser = async(req, res) => {
    const validExtensions = ['jpg', 'png', 'jpeg'];
    const binder = 'Images';
    const name = await fileUpload(req.files, validExtensions, binder);
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
        if (user.image) {
            const pathImage = path.join(__dirname, '../../Images/', user.image);
            const exists = await fs.existsSync(pathImage);
            if (exists) {
                await fs.unlinkSync(pathImage);
            }
        }
        user.image = name;
        user.save();
        return res.status(200).send({ message: 'Imagen actualizada' });
    } else {
        return res.status(404).send({ message: 'El usuario no existe' });
    }



}

const getImage = async(req, res) => {
    const validCollection = ['albums', 'artists', 'users'];
    const { id, collection } = req.params;


    try {
        if (validCollection.includes(collection)) {
            if (collection === 'users') {

                const user = await User.findById(id);
                if (user) {
                    if (user.image) {
                        const pathImage = path.join(__dirname, '../..Images/', user.image);
                        const exists = await fs.existsSync(pathImage);
                        if (exists && user.image.length) {
                            return res.sendFile(pathImage);
                        }
                    }
                    const defaultImage = path.join(__dirname, '../../assets/defaultUser.jpg')
                    return res.sendFile(defaultImage);
                } else {
                    return res.status(404).send({ message: 'El usuario no existe' })
                }

            }
            if (collection === 'artists') {

                const artist = await Artist.findById(id);
                if (artist) {
                    if (artist.image) {
                        const pathImage = path.join(__dirname, '../../Images/', artist.image)
                        const exists = await fs.existsSync(pathImage);
                        if (exists && artist.image.length) {
                            return res.sendFile(pathImage);
                        }
                    }
                    const defaultImage = path.join(__dirname, '../../assets/default.jpg')
                    return res.sendFile(defaultImage);
                } else {
                    return res.status(404).send({ message: 'El artista no existe' })
                }

            }
            if (collection === 'albums') {

                const album = await Album.findById(id);
                if (album) {
                    if (album.image) {
                        const pathImage = path.join(__dirname, '../../Images/', album.image)
                        const exists = await fs.existsSync(pathImage);
                        if (exists && album.image.length) {
                            return res.sendFile(pathImage);
                        }
                    }
                    const defaultImage = path.join(__dirname, '../../assets/default.jpg')
                    return res.sendFile(defaultImage);
                } else {
                    return res.status(404).send({ message: 'El álbum no existe' })
                }

            }


        } else {
            return res.status(400).send({ message: `Colección inválida: ${collection}, utiliza: ${validCollection}` });

        }



    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición: ' + error })
    }



}

module.exports = { uploadImage, uploadImageUser, getImage };