const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require,
    },
    surname: {
        type: String,
        require
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        require,
    },
    password: {
        type: String,
        trim: true,
        require
    },
    role: {
        type: String,
        uppercase: true,
        trim: true,
        require: true,
        default: 'USER'
    },
    image: {
        type: String

    },
    token: {
        type: String
    },
    expire: {
        type: Date
    },
    code: {
        type: String
    },
    status: {
        type: String,
        required: true,
        default: 'UNVERIFIED'
    },
    active: {
        type: Boolean,
        default: true
    },


})
UserSchema.methods.toJSON = function() {

    const users = this;
    const usersObject = users.toObject();
    delete usersObject.password;
    return usersObject;
}

module.exports = model('User', UserSchema);