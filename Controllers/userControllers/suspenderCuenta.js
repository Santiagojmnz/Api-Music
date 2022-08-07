const Usuario = require('../../Models/user');

exports.suspenderCuenta = async(request, response, next) => {
    try {
        // buscar el usuario por su id
        const usuario = await Usuario.findById( request.params._id );
        if (!usuario) {
            return response.status(404).json({ message: 'No existe el usuario' });
        }

        // cambia el status boleano del usuario
        usuario.active = false;

        await usuario.save();

        response.json({ message: 'Su cuenta ha sido suspendida temporalmente' });
        

    } catch (error) {
        console.log(error);
        response.status(503).json({
            error: true,
            message: 'Ocurrió un error al intentar cambiar el estatus de cuenta',
        })
    }
};
