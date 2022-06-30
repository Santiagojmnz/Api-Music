const {
    addUsser,
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

module.exports = {
    addUsser,
    findUser,
    findUserId,
    updateUser,
    deleteUser,
    confirmEmail,
    login,
    resetContrasena,
    validarToken,
    guardarNuevaContrasena,
    suspenderCuenta
}