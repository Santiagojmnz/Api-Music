const { songRegister } = require('../songControllers/register');

const {
    updateSong,
    deleteSong
} = require("./updateAndDelete");

module.exports = {
    songRegister,
    updateSong,
    deleteSong
}