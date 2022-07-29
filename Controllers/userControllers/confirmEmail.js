const User = require('../../Models/user');
const { tokenData } = require('../../Services/jwt.js')

const confirmEmail = async(req, res) => {
    const { token } = req.params;
    const data = await tokenData(token);
    const { code, email } = data.data;

    User.findOne({ email })

    .then((user) => {
            if (user.code == code && user.status == 'UNVERIFIED') {
                user.status = "VERIFIED";
                user.code = "";
                user.save()
                return res.status(200).json({ message: 'Cuenta verificada correctamente: ' + user.email })

            } else {
                return res.status(200).json({ message: 'La cuenta ya ha sido verificada: ' + user.email })

            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error al procesar la peticion ' + err })
        });



}
module.exports = {
    confirmEmail
}