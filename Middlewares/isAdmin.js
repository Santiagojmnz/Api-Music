exports.isAdmin = (req, res, next) => {

    try {
        if (req.user) {
            const { role, name } = req.user
            if (role === 'ADMIN') {
                return next();
            } else {
                return res.status(403).send({
                    message: `${name}, no cuentas con los permisos suficientes`
                })
            }

        }


    } catch (error) {
        return res.status(500).send({ message: 'Error al procesar la petición ' + error })
    }

}