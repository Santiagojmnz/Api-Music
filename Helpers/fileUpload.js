const path = require('path');
const { uid } = require('uid/secure');

const fileUpload = (files, validExtensions, binder) => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const split = file.name.split('.');
        const extension = split[split.length - 1];
        if (!validExtensions.includes(extension)) {
            throw new Error(`Extension invalida ${extension} `);
        }
        const name = uid(16) + '.' + extension;
        const uploadPath = path.join(__dirname, '../Uploads', binder, name);

        file.mv(uploadPath, (error) => {
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