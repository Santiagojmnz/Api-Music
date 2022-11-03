const Album = require('../../Models/album');
const Artist = require('../../Models/artist');
const User = require('../../Models/user');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);
//ADNMIN
const uploadImage = async(req, res) => {
    const { id, collection } = req.params;
    const { tempFilePath } = req.files.file;
    try {
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        if (collection == 'artists') {
            const artist = await Artist.findByIdAndUpdate(id);
            if (artist) {
                if (artist.image) {
                    const image = artist.image.split('/');
                    const nombre = image[image.length - 1];
                    const [imageId] = nombre.split('.');
                    cloudinary.uploader.destroy(imageId)
                }
                artist.image = secure_url;
                artist.save();
                return res.status(200).send({ message: 'Imagen actualizada' });
            } else {
                return res.status(404).send({ message: 'El artista no existe' });
            }
        } else {
            const album = await Album.findByIdAndUpdate(id);
            if (album) {
                if (album.image) {
                    const image = album.image.split('/');
                    const nombre = image[image.length - 1];
                    const [imageId] = nombre.split('.');
                    cloudinary.uploader.destroy(imageId)
                }
                album.image = secure_url;
                album.save();
                return res.status(200).send({ message: 'Imagen actualizada' });
            } else {
                return res.status(404).send({ message: 'El álbum no existe' });
            }
        }

    } catch (error) {

        return res.status(500).send({ message: 'Error al procesar la petición: ' + error });

    }
}

const uploadImageUser = async(req, res) => {
    const id = req.params.id;
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    const user = await User.findByIdAndUpdate(id);
    if (user) {
        if (user.image) {
            const image = user.image.split('/');
            const nombre = image[image.length - 1];
            const [imageId] = nombre.split('.');
            cloudinary.uploader.destroy(imageId)
        }
        user.image = secure_url;
        user.save();
        return res.status(200).send({ message: 'Imagen actualizada' });
    } else {
        return res.status(404).send({ message: 'El usuario no existe' });
    }
}



module.exports = { uploadImage, uploadImageUser, };