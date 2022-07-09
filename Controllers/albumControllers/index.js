const { albumRegister } = require('./register');
const {
    updateAlbum,
    deleteAlbum
} = require("./updateAndDelete");
const {findAlbum, findAlbumId, albumPaginate} = require('./findAlbum');

module.exports = {
    albumRegister,
    updateAlbum,
    deleteAlbum,
    findAlbum,
    findAlbumId,
    albumPaginate
}