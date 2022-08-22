const path = require('path');
const { uid } = require('uid/secure');

const fileUpload = (files, validExtensions, binder) => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const split = file.name.split('.');
        const extension = split[split.length - 1];
        if (!validExtensions.includes(extension)) {
            throw new Error(`Extensión inválida ${extension}, sólo se permiten archivos ${validExtensions}`);
        }
        const name = uid(16) + '.' + extension;
        const pathFile = path.join(__dirname, `../${binder}`, name);


        file.mv(pathFile, (error) => {
            if (error) {
                reject(error);
            }

            resolve(name);
        });


    });





}

module.exports = {
    fileUpload
}