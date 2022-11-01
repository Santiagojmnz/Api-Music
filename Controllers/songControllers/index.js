const { songRegister } = require('../songControllers/register');

const {
    updateSong,
    deleteSong
} = require("./updateAndDelete");

const {
    findSong,
    getSongFile,
    songsPaginate
} = require('../songControllers/findSong');


module.exports = {
    songRegister,
    updateSong,
    deleteSong,
    findSong,
    getSongFile,
    songsPaginate
}