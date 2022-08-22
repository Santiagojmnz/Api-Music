const { Schema, model } = require('mongoose');
const Song = require('./song');
const PLayList = require('./playList');

const ListSongSchema = new Schema({
    playlist: {
        type: Schema.ObjectId,
        ref: 'PlayList',
        require

    },
    song: {
        type: Schema.ObjectId,
        ref: 'Song'
    }

});

module.exports = model('ListSong', ListSongSchema);