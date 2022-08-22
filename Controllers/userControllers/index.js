const {
    addUser,
    findUser,
    findUserId,
    updateUser,
    deleteUser
} = require("./user");

const { confirmEmail } = require('./confirmEmail')
const { login } = require('./login');
const { suspenderCuenta } = require("./suspenderCuenta");
const {
    resetContrasena,
    validarToken,
    guardarNuevaContrasena
} = require("./recContrasena");

const {
    googleSignin
} = require("./loginGoogle");

const {
    changePassword
} = require("./changePassword");

module.exports = {
    addUser,
    findUser,
    findUserId,
    updateUser,
    deleteUser,
    confirmEmail,
    login,
    resetContrasena,
    validarToken,
    guardarNuevaContrasena,
    suspenderCuenta,
    googleSignin,
    changePassword
}