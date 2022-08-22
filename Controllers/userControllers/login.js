const User = require('../../Models/user');
const bcrypt = require('bcrypt');
const { createToken } = require('../../Services/jwt');


const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'No se encontró el correo electrónico en la base de datos' });

        }

        if (user.status !== 'VERIFIED') {
            return res.status(403).json({ message: 'Cuenta no verificada, accede a tu correo electrónico para verificar la cuenta' });
        }

        const checkPassword = await bcrypt.compareSync(password, user.password);
        if (!checkPassword) {

            res.status(401).json({ message: 'Usuario y/o contaseña incorrecta' });


        } else {
            const token = await createToken(user.id);

            //Activacion de la cuenta en caso de estar suspendida
            if (user.active === false) {
                user.active = true;
            }

            res.status(200).send({ user, token })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error al procesar la petición' })
    }




}




module.exports = {
    login
}