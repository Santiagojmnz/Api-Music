const { Schema, model } = require('mongoose');

const AlbumSchema = new Schema({
    title: {
        type: String,
        trim: true,
        require,

    },
    description: {
        type: String,
        trim: true,
        require

    },
    year: {
        type: Number,
        require
    },
    image: {
        type: String
    },
    artist: {
        type: Schema.ObjectId,
        ref: 'Artist'
    }

});
module.exports = model('Album', AlbumSchema);