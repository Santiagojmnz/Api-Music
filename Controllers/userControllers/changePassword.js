const User = require('../../Models/user')
const bcrypt = require('bcrypt');

const changePassword = async(req, res) => {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const id = req.params.id;
    try {
        if (password != null && newPassword != null && confirmPassword != null && password != "" && newPassword != "" && confirmPassword != "") {
            const user = await User.findById({ _id: id });
            if (user) {
                const comparePass = bcrypt.compareSync(password, user.password)
                if (!comparePass) {
                    return res.status(400).send({ message: 'Error al actualizar la contraseña, Contraseña actual incorrecta' })
                } else {

                    if (newPassword == confirmPassword) {
                        const hash = bcrypt.hashSync(newPassword, 10);
                        user.password = hash;
                        user.save();
                        return res.status(200).send({ message: 'Contraseña actualizada' })

                    } else {
                        return res.status(400).send({ message: 'La confirmación de contraseña no coincide' })
                    }
                }
            } else {
                return res.status(404).send({ message: 'El usuario no existe' })
            }

        } else {
            res.status(400).send({ message: 'Por favor ingrese los campos obligatorios (*) faltantes' })
        }
    } catch (err) {
        res.status(500).send({ message: 'Error al procesar la petición ' + err })
    }
}


module.exports = {
    changePassword
}