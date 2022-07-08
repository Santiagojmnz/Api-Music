const { Schema, model } = require('mongoose');
const ArtistSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require,
        unique: true

    },
    description: {
        type: String,
        trim: true,
        require

    },
    image: {
        type: String
    }



});
module.exports = model('Artist', ArtistSchema)