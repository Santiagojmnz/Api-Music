const { artistRegister } = require('./register');
const {
    updateArtist,
    deleteArtist
} = require("./update&Delete");

module.exports = {
    artistRegister,
    updateArtist,
    deleteArtist
}