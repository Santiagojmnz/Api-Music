const nodemailer = require('nodemailer');
const dotenv =require('dotenv').config();
const servidor = process.env.SERVIDOR_SMTP;
const config = process.env;
async function confirmEmail(nombre, lastname, email, code) {
    try {
        let transporter = nodemailer.createTransport({
            host: config.SERVIDOR_SMTP,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.USUARIO_SMTP, // generated ethereal user
                pass: config.PASSWORD_SMTP, // generated ethereal password
            },
        });

        let mensaje = `Hola, ${nombre} ${lastname} <br>`;
        mensaje += 'Te damos la bienvenida a API-MUSIC ';
        mensaje += `para verificar tu cuenta <a href="${config.RUTA}${code}">Haz clic aquí</a><br>`;

        let info = await transporter.sendMail({
            from: `Confirmación de cuenta<${config.USUARIO_SMTP}>`, // sender address
            to: `${nombre}<${email}>`, // list of receivers: Juan Pérez<juan@algo.com>
            subject: "Confirmación de cuenta", // Subject line
            html: mensaje, // html body
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    confirmEmail
}