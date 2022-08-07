const Artist = require('../../Models/artist');
const Album = require('../../Models/album');
const Song = require('../../Models/song');

const search = async(req, res) => {
    const { query } = req.params;
    const regEx = new RegExp(query, 'i');
    const results = [];

    try {
        const artists = await Artist.find({ $or: [{ name: regEx }, { description: regEx }] });
        const albums = await Album.find({ $or: [{ title: regEx }, { description: regEx }] });
        const songs = await Song.find({ name: regEx });

        if (query) {
            if (artists.length) {
                results.push({ Artists: artists });
            }
            if (albums.length) {
                results.push({ Albums: albums })
            }
            if (songs.length) {
                results.push({ Songs: songs })
            }


        }
        if (query == 'undefined') {
            results = [];
        }


        return res.status(200).send({ results });



    } catch (error) {
        return res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }

}
module.exports = {
    search
}