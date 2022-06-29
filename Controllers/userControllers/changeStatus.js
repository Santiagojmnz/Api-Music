const Usuario = require('../../Models/user');

exports.cambiarStatus = async(request, response, next) => {
    try {
        // comprueba la existencia del parametro
        if (!request.params._id) {
            return response.status(400).json({ error: true, message: 'Debe proporcionar el id del usuario.' });
        }

        // buscar el usuario por su id
        const usuario = await Usuario.findById( request.params._id );
        if (!usuario) {
            return response.status(404).json({ message: 'No existe el usuario. ' });
        }

        // cambia el status boleano del usuario
        usuario.active = !usuario.active;

        await usuario.save();

        //si el status es activo 
        if (usuario.active === true) {
            response.json({ message: 'Su cuenta ha sido activada' });
        } else if (usuario.active === false) {
        //si el status es suspendido
            response.json({ message: 'Su cuenta ha sido suspendida temporalmente' });
        } else {
            response.status(503).json({
                error: true,
                message: 'Ha ocurrido un error',
            })
        }

    } catch (error) {
        console.log(error);
        response.status(503).json({
            error: true,
            message: 'Ocurrió un error al intentar cambiar el estatus de cuenta.',
        })
    }
};
