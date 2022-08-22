const nodemailer = require('nodemailer');
const dotenv =require('dotenv').config();
const config = process.env;
exports.passwordEmail = async(name, surname, email, token) => {
    try {
        let transporter = nodemailer.createTransport({
            host: config.SERVIDOR_SMTP,
            port: 587,
            secure: false,
            auth: {
                user: config.USUARIO_SMTP,
                pass: config.PASSWORD_SMTP,
            },
        });

        let mensaje = `Hola, ${name} ${surname} <br>`;
        mensaje += 'Has solicitado restaurar tu contraseña, ';
        mensaje += `<a href="${config.RUTA}${token}">Haz clic aquí</a><br>`;
        mensaje += 'El enlace es válido sólo por una hora desde su envío.';

        let info = await transporter.sendMail({
            from: `Recuperacion<${config.USUARIO_SMTP}>`,
            to: `${name}<${email}>`,
            subject: "Recuperación de contraseña",
            html: mensaje,
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};