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
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
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