const User = require('../../Models/user')
const bcrypt = require('bcrypt');

const changePassword = async(req, res) => {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const id = req.params.id;
    try  {
        if(password != null && newPassword != null && confirmPassword != null){
            const user = await User.findById({ _id: id });
            const comparePass = bcrypt.compareSync(password, user.password)
            if (!comparePass) {
                res.status(500).send({ message: 'Error al actualizar la contraseña, Contraseña incorrecta' })
            } else {
    
                if (newPassword == confirmPassword) {
                    const hash = bcrypt.hashSync(newPassword, 10);
                    user.password = hash;
                    res.status(200).send({ message: 'Contraseña actualizada' })
                    user.save();
    
                } else {
                    res.status(500).send({ message: 'La confirmación de contraseña no coincide' })
                }
            }
        } else{
            res.status(500).send({message: 'Los campos no pueden quedar vacíos'})
        }
    } catch (err) {
        res.status(500).send({ message: 'Error al procesar la petición ' + err })
}
}


module.exports = {
    changePassword
}