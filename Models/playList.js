const { Schema, model } = require('mongoose');
const User = require('../Models/user');

const PlayListSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require,

    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }

});

module.exports = model('PlayList', PlayListSchema);