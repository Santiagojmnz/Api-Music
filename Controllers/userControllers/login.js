const User = require('../../Models/user');
const bcrypt = require('bcrypt');
const { createToken } = require('../../Services/jwt');


const login = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });

    }

    if (user.status != 'VERIFIED') {
        return res.status(400).json({ message: 'Cuenta no verificada, Accede a tu correo electrónico para verificar la cuenta' });
    }

    const checkPassword = await bcrypt.compareSync(password, user.password);
    if (!checkPassword) {

        res.status(500).json({ message: 'Usuario y/o contaseña incorectos' });


    } else {
        const token = await createToken(user.id)
        res.status(200).send({ user, token })
    }



}




module.exports = {
    login
}