const path = require('path');
const { uid } = require('uid/secure');

const fileUpload = (files, validExtensions, binder, param) => {

    return new Promise((resolve, reject) => {
        if (files.file) {
            const { file } = files;
            const split = file.name.split('.');
            const extension = split[split.length - 1];
            if (!validExtensions.includes(extension)) {
                throw new Error(`Extension invalida file ${extension} `);
            }
            const name = uid(16) + '.' + extension;
            const uploadPath = path.join(__dirname, '../Uploads', binder, name);

            file.mv(uploadPath, (error) => {
                if (error) {
                    reject(error);
                }

                resolve(name);
            });
        }
        if (files.image) {
            const { image } = files;
            const split = image.name.split('.');
            const extension = split[split.length - 1];
            if (!validExtensions.includes(extension)) {
                throw new Error(`Extension invalida image ${extension} `);
            }
            const name = uid(16) + '.' + extension;
            const uploadPath = path.join(__dirname, '../Uploads', binder, name);

            image.mv(uploadPath, (error) => {
                if (error) {
                    reject(error);
                }

                resolve(name);
            });

        }


    });





}

module.exports = {
    fileUpload
}