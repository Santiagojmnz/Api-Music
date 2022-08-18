const User = require('../../Models/user');
const { tokenData } = require('../../Services/jwt.js')

const confirmEmail = async(req, res) => {
    try {
        const { token } = req.params;
        const data = await tokenData(token);
        const { code, email } = data.data;

        User.findOne({ email })

        .then((user) => {
            if (user.code == code && user.status == 'UNVERIFIED') {
                user.status = "VERIFIED";
                user.code = "";
                user.save()
                return res.status(200).json({ message: 'Cuenta verificada correctamente: ' + user.email });

            } else {
                return res.status(200).json({ message: 'La cuenta ya ha sido verificada anteriormente' + user.email });

            }
        })
    } catch (error) {
        if (error.message === "invalid signature") {
            return res.status(400).send({ message: 'Token no válido' });
        }
        return res.status(500).send({ message: 'Error al procesar la petición' + error });

    }



}
module.exports = {
    confirmEmail
}