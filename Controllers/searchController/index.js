const Artist = require('../../Models/artist');
const Album = require('../../Models/album');
const Song = require('../../Models/song');

const search = async(req, res) => {
    const { query } = req.params;
    const regEx = new RegExp(query, 'i');
    var songs = "";
    var albums = "";
    var artists = "";

    try {
        const getArtists = await Artist.find({ $or: [{ name: regEx }, { description: regEx }] });
        const getAlbums = await Album.find({ $or: [{ title: regEx }, { description: regEx }] });
        const getSongs = await Song.find({ name: regEx });
        if (query == 'undefined') {

        } else {

            if (getArtists.length) {
                artists = getArtists
            }
            if (getAlbums.length) {
                albums = getAlbums
            }
            if (getSongs.length) {
                songs = getSongs
            }



        }

        var results = { artists, albums, songs }


        if (getArtists.length || getSongs.length || getAlbums.length) {
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
    var results = "";

    try {
        if (query == 'undefined') {

        } else {
            if (query) {
                if (collection == 'artists') {
                    const getArtists = await Artist.find({ $or: [{ name: regEx }, { description: regEx }] });
                    results = getArtists;
                }
                if (collection == 'albums') {
                    const getAlbums = await Album.find({ $or: [{ title: regEx }, { description: regEx }] });
                    results = getAlbums;
                }
                if (collection == 'songs') {
                    const getSongs = await Song.find({ name: regEx });
                    results = getSongs;
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