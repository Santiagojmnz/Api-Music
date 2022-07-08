const { artistRegister } = require('./register');
const {
    updateArtist,
    deleteArtist
} = require("./updateAndDelete");

module.exports = {
    artistRegister,
    updateArtist,
    deleteArtist
}