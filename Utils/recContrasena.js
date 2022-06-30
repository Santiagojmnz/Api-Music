const nodemailer = require('nodemailer');
const config = require('../config/Config');

exports.passwordEmail = async(name, surname, email, token) => {
    try {
        let transporter = nodemailer.createTransport({
            host: config.SERVIDOR_SMTP,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.USUARIO_SMTP, 
                pass: config.PASSWORD_SMTP, 
            },
        });

        let mensaje = `Hola ${name} ${surname} <br>`;
        mensaje += 'Has solicitado restaurar tu contraseña, ';
        mensaje += `<a href="${config.RUTA}${token}">Haz clic aquí para comenzar el proceso.</a><br>`;
        mensaje += 'Este enlace es válido sólo por una hora desde su envío.';
        mensaje += `Token solo para las pruebas:${token}`;

        let info = await transporter.sendMail({
            from: `Recuperación<${config.USUARIO_SMTP}>`, // sender address
            to: `${name}<${email}>`, // list of receivers: Juan Pérez<juan@algo.com>
            subject: "Recuperación de contraseña API-MUSIC", // Subject line
            html: mensaje, // html body
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};