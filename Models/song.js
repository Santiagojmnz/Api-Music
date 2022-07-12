const { Schema, model } = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Album = require('../Models/album');

const SongSchema = new Schema({
    number: {
        type: Number,
        require
    },
    name: {
        type: String,
        trim: true,
        require,
    },
    duration: {
        type: String,
        trim: true,
        require
    },
    file: {
        type: String,
        trim: true,
        require,
    },
    album: {
        type: Schema.ObjectId,
        ref: 'Album',
        require
    },
})
SongSchema.plugin(paginate);
module.exports = model('Song', SongSchema);