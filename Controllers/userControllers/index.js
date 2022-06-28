const {
    addUsser,
    findUser,
    findUserId,
    updateUser,
    deleteUser
} = require("./user");

const { confirmEmail } = require('./confirmEmail')
const { login } = require('./login');
module.exports = {
    addUsser,
    findUser,
    findUserId,
    updateUser,
    deleteUser,
    confirmEmail,
    login
}