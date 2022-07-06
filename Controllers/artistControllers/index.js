const { artistRegister } = require('./register');
const {
    updateArtist,
    deleteArtist
} = require("./updateAndDelete");
const { findArtist, findArtistId, artistPaginate } = require('./findArtist');

module.exports = {
    artistRegister,
    updateArtist,
    deleteArtist,
    findArtist,
    findArtistId,
    artistPaginate
}