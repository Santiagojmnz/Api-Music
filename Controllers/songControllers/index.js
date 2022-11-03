const { songRegister } = require('../songControllers/register');

const {
    updateSong,
    deleteSong
} = require("./updateAndDelete");

const {
    getSongs,
    findSong,
    songsPaginate
} = require('../songControllers/findSong');


module.exports = {
    songRegister,
    updateSong,
    deleteSong,
    findSong,
    songsPaginate,
    getSongs
}