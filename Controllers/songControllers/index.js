const { songRegister } = require('../songControllers/register');
const { findSong, findSongId, songsPaginate } = require('../songControllers/findSong');

module.exports = {
    songRegister,
    findSong,
    findSongId,
    songsPaginate
}