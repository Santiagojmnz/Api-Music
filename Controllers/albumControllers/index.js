const { albumRegister } = require('./register');
const {
    updateAlbum,
    deleteAlbum
} = require("./updateAndDelete");

module.exports = {
    albumRegister,
    updateAlbum,
    deleteAlbum
}