const Usuario = require('../../Models/user');

exports.suspenderCuenta = async(request, response, next) => {
    try {
        // buscar el usuario por su id
        const usuario = await Usuario.findOne({ _id: request.params.id });

        if (!usuario) {
            return response.status(404).json({ message: 'El usuario no existe' });
        }

        // cambia el status boleano del usuario
        usuario.active = false;

        usuario.save();

        return response.status(200).json({ message: 'Su cuenta ha sido suspendida temporalmente, Inicie sesión para reactivarla' });


    } catch (error) {
        console.log(error);
        response.status(503).json({
            message: 'Ocurrió un error al intentar cambiar el estatus de cuenta'
        })
    }
};