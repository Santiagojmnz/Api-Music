const { songRegister } = require('../songControllers/register');

const {
    updateSong,
    deleteSong
} = require("./updateAndDelete");

const { findSong, 
    findSongId, 
    songsPaginate 
} = require('../songControllers/findSong');


module.exports = {
    songRegister,
    updateSong,
    deleteSong,
    findSong,
    findSongId,
    songsPaginate
}