const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Artist = require('../Models/artist');

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
    gender: {
        type: String,
        trim: true,
        require

    },
    artist: {
        type: Schema.ObjectId,
        ref: 'Artist'
    }

});
AlbumSchema.plugin(mongoosePaginate);

module.exports = model('Album', AlbumSchema);