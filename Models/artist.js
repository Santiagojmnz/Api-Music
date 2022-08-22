const { Schema, model } = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');
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
ArtistSchema.plugin(mongoosePaginate);
module.exports = model('Artist', ArtistSchema)