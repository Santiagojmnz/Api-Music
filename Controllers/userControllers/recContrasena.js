const bcrypt = require('bcrypt');
const Usuario = require('../../Models/user');
const { passwordEmail } = require('../../Utils/recContrasena');

exports.resetContrasena = async(request, response, next) => {
    try {
        // comprueba la existencia del parametro email
        if (!request.body.email) {
            return response.status(400).json({ error: true, message: 'Debe proporcionar el email.' });
        }

        // busca el usuario con ese email
        const usuario = await Usuario.findOne({ email: request.body.email });
        if (!usuario) {
            return response.status(404).json({ message: 'No existe el usuario. ' });
        }

        // genera el token de recuperación de contraseña
        let token = await bcrypt.hash(usuario.email + Date.now().toString(), 10);
        // $4sf445df45sdf$/&45fgh45g
        token = token.replace(/\//g, "-");

        // guarda el token
        usuario.token = token;
        usuario.expire = Date.now() + 3600000; // expira en 1 hora

        await usuario.save();

        // envia el email
        const resultadoEmail = await passwordEmail(
            usuario.name, usuario.surname,
            usuario.email,
            token
        );

        if (resultadoEmail) {
            response.json({ message: 'Un mensaje ha sido enviado al email proporcionado.' });
        } else {
            response.status(503).json({
                error: true,
                message: 'Ocurrió un error al enviar el email de recuperación.',
            })
        }

    } catch (error) {
        console.log(error);
        response.status(503).json({
            error: true,
            message: 'Ocurrió un error al intentar enviar el email de recuperación.',
        })
    }
};

exports.validarToken = async(request, response, next) => {
    try {
        // busca el usuario con el token y vigencia
        const usuario = await Usuario.findOne({

            token: request.body.token,
            expire: {
                $gte: new Date()
            }, 

        });

        if (!usuario) {
            return response.status(400).json({
                message: 'El link de restablecimineto es inválido o ya ha expirado.'
            });
        }

        // retorna un status que indique si es válido
        response.json({
            isValid: true,
            message: 'Ingrese una nueva contraseña.',
        });
    } catch (error) {
        console.log(error);
        response.status(503).json({ message: 'Error al validar el token.' });
    }
};

exports.guardarNuevaContrasena = async(request, response, next) => {
    try {
        // valida el token
        const usuario = await Usuario.findOne({

            token: request.body.token,
            expire: {
                $gte: new Date()
            }, 

        });

        if (!usuario) {
            return response.status(400).json({
                message: 'El link de restablecimiento es inválido o ha expirado.'
            });
        }

        // valida que se reciba la contraseña
        if (!request.body.password) {
            response.status(400).json({ message: 'La contraseña es obligatoria.' });
        }

        // cifra la contraseña y la introduce en los datos del usuario
        bcrypt.hash(request.body.password, 10, function(err, hash) {
            usuario.password = hash;

            // quita el token de recuperación
            usuario.token = '';
            usuario.expire = null;

            // guardamos cambios
            usuario.save();
        });

        response.json({ message: 'La nueva contraseña ha sido guardada.' });

    } catch (error) {
        console.log(error);
        response.status(503).json({ message: 'Error al actualizar contraseña.' });
    }
};