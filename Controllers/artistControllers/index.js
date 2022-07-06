const { artistRegister } = require('./register');

const { findArtist, findArtistId, artistPaginate } = require('./findArtist');

module.exports = {
    artistRegister,
    findArtist,
    findArtistId,
    artistPaginate
}