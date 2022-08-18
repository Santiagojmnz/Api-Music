exports.isAdmin = (req, res, next) => {
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
}