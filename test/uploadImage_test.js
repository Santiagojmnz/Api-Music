let chai = require("chai");
let chaiHTTP = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHTTP);
const url = "http://localhost:8000/api/";
const Authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJiY2FjNDAwMjUwYzgxNDM0NDBhMjVmIiwiaWF0IjoxNjU5MzE4NDEyLCJleHAiOjE2NjE5MTA0MTJ9.eou4yXQHt6G2jpYbPk17f61LG1_QHa23iP6kYn31TVE";

describe("Pruebas a uploadImage", () => {
    describe("Subir imagen de album", () => {
        it("Debe almacenar la imagen correctamente", (done) => {
            chai.request(url)
            .put('albums/62ccf7258350a09d22af737d')
            .set('Authorization', `${Authorization}`)
            .field('Content-Type', 'multipart/form-data')
            .attach('file', "/Users/JOSEFRANCO/Downloads/Encore.jpg")
            .end(
                function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.be.equal('Imagen actualizada');
                    done();
                }
            )
        })
        it("Debe rechazar la imagen por falta de credenciales", (done) => {
            chai.request(url)
            .put('albums/62ccf7258350a09d22af737d')
            .field('Content-Type', 'multipart/form-data')
            .attach('file', "/Users/JOSEFRANCO/Downloads/Encore.jpg")
            .end(
                function(err, res){
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                    done();
                }
            )
        })
        it("Debe rechazar la imagen por inexistencia de album", (done) => {
            chai.request(url)
            .put('albums/62ccf7258350a09d22af73dd')
            .set('Authorization', `${Authorization}`)
            .field('Content-Type', 'multipart/form-data')
            .attach('file', "/Users/JOSEFRANCO/Downloads/Encore.jpg")
            .end(
                function(err, res){
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').to.be.equal('El álbum no existe');
                    done();
                }
            )
        })
    });
    //Pruebas UploadUser
    describe("Subir imagen de un usuario", () => {
        it("Debe almacenar la imagen", (done) => {
            chai.request(url)
            .put('users/62bcbeb6f264341814de5619')
            .set('Authorization', `${Authorization}`)
            .field('Content-Type', 'multipart/form-data')
            .attach('file', "/Users/JOSEFRANCO/Downloads/Anotando.png")
            .end(
                function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.be.equal('Imagen actualizada');
                    done();
                }
            )
        })
        it("Debe rechazar la imagen por falta de credenciales", (done) => {
            chai.request(url)
            .put('users/62ccf7258350a09d22af737d')
            .field('Content-Type', 'multipart/form-data')
            .attach('file', "/Users/JOSEFRANCO/Downloads/Anotando.png")
            .end(
                function(err, res){
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                    done();
                }
            )
        })
        it("Debe rechazar la imagen por inexistencia de usuario", (done) => {
            chai.request(url)
            .put('users/62ccf7258350a09d22af73dd')
            .set('Authorization', `${Authorization}`)
            .field('Content-Type', 'multipart/form-data')
            .attach('file', "/Users/JOSEFRANCO/Downloads/Anotando.png")
            .end(
                function(err, res){
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').to.be.equal('El usuario no existe');
                    done();
                }
            )
        })
       
    });
    //Pruebas a obtener una imagen
    describe("Obtener imagen", () => {
        it("Debe obtener la imagen", (done) => {
            chai.request(url)
            .get('image-albums/62ccf7258350a09d22af737d')
            .set('Authorization', `${Authorization}`)
            .end(
                function(err, res){
                    expect(res).to.have.status(200);
                    done();
                }
            )
        })
        it("Debe rechazar la petición por falta de credenciales", (done) => {
            chai.request(url)
            .get('image-albums/62ccf7258350a09d22af737d')
            .end(
                function(err, res){
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property('message');
                    done();
                }
            )
        })
        it("Debe rechazar la imagen por inexistencia", (done) => {
            chai.request(url)
            .get('image-albums/62ccf7258350a09d22af73dd')
            .set('Authorization', `${Authorization}`)
            .end(
                function(err, res){
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').to.be.equal('El álbum no existe');
                    done();
                }
            )
        })
    });
   
});