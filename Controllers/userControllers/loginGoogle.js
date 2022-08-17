const { response } = require('express');
const User = require('../../Models/user');

const { googleVerify } = require('../../helpers/google-verify');
const { createToken } = require('../../Services/jwt');


const googleSignin = async(req, res = response) => {
    const { id_token } = req.body;
    try {

        const { given_name, family_name, picture, email } = await googleVerify(id_token);


        if (given_name == undefined && family_name == undefined && picture == undefined && email == undefined) {
            res.status(400).send({ message: 'Autentiación fallida, token invalido' })
        } else {
            let user = await User.findOne({ email });

            if (!user) {
                const data = {
                    name: given_name,
                    surname: family_name,
                    email,
                    image: picture,
                    status: 'VERIFIED'
                };
                user = new User(data);
                await user.save()

            }

            //Generar el token
            const token = await createToken(user.id);
            res.status(200).send({
                user,
                token
            });

        }


    } catch (error) {
        res.status(500).send({ message: 'Error al procesa la petición ' + error })
    }




}

module.exports = {
    googleSignin
}