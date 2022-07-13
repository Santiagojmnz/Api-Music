const Album = require('../../Models/album');
const Artist = require('../../Models/artist');
const User = require('../../Models/user');


const uploadImage = async(req, res) => {
    const validCollection = ['albums', 'artists', 'users'];
    const validExtensions = ['jpg', 'png', 'jpeg'];

    const { id, collection } = req.params;

    try {
        const included = validCollection.includes(collection);
        if (included) {


        } else {

        }
        res.status(400).send({ message: `Coleccion invalida: ${collection}, utiliza: ${validCollection}` });




    } catch (error) {

    }


}

module.exports = { uploadImage };