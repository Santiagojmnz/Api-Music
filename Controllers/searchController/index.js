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
        if (query == 'undefined') {
            results = [];
        } else {
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
        }
        if (results.length) {
            return res.status(200).send({ results });
        } else {
            return res.status(404).send({ message: 'Sin resultados', results });
        }





    } catch (error) {
        return res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }

}

const directedSearch = async(req, res) => {
    const { query, collection } = req.params;
    const regEx = new RegExp(query, 'i');
    const results = [];

    try {
        if (query == 'undefined') {
            results = [];
        } else {
            if (query) {
                if (collection == 'artists') {
                    const artists = await Artist.find({ $or: [{ name: regEx }, { description: regEx }] });
                    results.push({ Artists: artists });
                }
                if (collection == 'albums') {
                    const albums = await Album.find({ $or: [{ title: regEx }, { description: regEx }] });
                    results.push({ Albums: albums })
                }
                if (collection == 'songs') {
                    const songs = await Song.find({ name: regEx });
                    results.push({ Songs: songs })
                }


            }
        }
        if (results.length) {
            return res.status(200).send({ results });
        } else {
            return res.status(404).send({ message: 'Sin resultados', results });
        }





    } catch (error) {
        return res.status(500).send({ message: 'Error al procesar la petición ' + error });
    }

}
module.exports = {
    search,
    directedSearch
}