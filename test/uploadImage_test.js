const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require('dotenv').config();
const url = process.env.URL;
const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';

describe("Pruebas a uploadImage", () => {
    describe("Subir imagen de album", () => {
        it("Debe almacenar la imagen correctamente", (done) => {
            chai.request(url)
                .put('/albums/62ccf7258350a09d22af737d')
                .set('Authorization', `${Authorization}`)
                .field('Content-Type', 'multipart/form-data')
                .attach('file', "/Users/Ssnjm/Downloads/legendaddy_388189_20220408215621.jpg")
                .end(
                    function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').to.be.equal('Imagen actualizada');
                        done();
                    }
                )
        })
        it("Debe rechazar la imagen por falta de credenciales", (done) => {
            chai.request(url)
                .put('/albums/62ccf7258350a09d22af737d')
                .field('Content-Type', 'multipart/form-data')
                .attach('file', "/Users/Ssnjm/Downloads/legendaddy_388189_20220408215621.jpg")
                .end(
                    function(err, res) {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                        done();
                    }
                )
        })
        it("Debe rechazar la imagen por inexistencia de álbum", (done) => {
            chai.request(url)
                .put('/albums/62ccf7258350a09d22af73dd')
                .set('Authorization', `${Authorization}`)
                .field('Content-Type', 'multipart/form-data')
                .attach('file', "/Users/Ssnjm/Downloads/legendaddy_388189_20220408215621.jpg")
                .end(
                    function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message').to.be.equal('El álbum no existe');
                        done();
                    }
                )
        })
        it("Debe rechazar la imagen por inexistencia de colección", (done) => {
            chai.request(url)
                .put('/albumes/62ccf7258350a09d22af737d')
                .set('Authorization', `${Authorization}`)
                .field('Content-Type', 'multipart/form-data')
                .attach('file', "/Users/Ssnjm/Downloads/legendaddy_388189_20220408215621.jpg")
                .end(
                    function(err, res) {
                        expect(res).to.have.status(400);
                        expect(res.body).to.have.property('message').to.be.equal('Colección inválida: albumes, utiliza: albums,artists');
                        done();
                    }
                )
        })
    });
    //Pruebas UploadUser
    describe("Subir imagen de un usuario", () => {
        it("Debe almacenar la imagen", (done) => {
            chai.request(url)
                .put('/users/62bcbeb6f264341814de5619')
                .set('Authorization', `${Authorization}`)
                .field('Content-Type', 'multipart/form-data')
                .attach('file', "/Users/Ssnjm/Downloads/legendaddy_388189_20220408215621.jpg")
                .end(
                    function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').to.be.equal('Imagen actualizada');
                        done();
                    }
                )
        })
        it("Debe rechazar la imagen por falta de credenciales", (done) => {
            chai.request(url)
                .put('/users/62ccf7258350a09d22af737d')
                .field('Content-Type', 'multipart/form-data')
                .attach('file', "/Users/Ssnjm/Downloads/legendaddy_388189_20220408215621.jpg")
                .end(
                    function(err, res) {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                        done();
                    }
                )
        })
        it("Debe rechazar la imagen por inexistencia de usuario", (done) => {
            chai.request(url)
                .put('/users/62ccf7258350a09d22af73dd')
                .set('Authorization', `${Authorization}`)
                .field('Content-Type', 'multipart/form-data')
                .attach('file', "/Users/Ssnjm/Downloads/legendaddy_388189_20220408215621.jpg")
                .end(
                    function(err, res) {
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
                .get('/image-albums/62ccf7258350a09d22af737d')
                .set('Authorization', `${Authorization}`)
                .end(
                    function(err, res) {
                        expect(res).to.have.status(200);
                        done();
                    }
                )
        })
        it("Debe rechazar la petición por falta de credenciales", (done) => {
            chai.request(url)
                .get('/image-albums/62ccf7258350a09d22af737d')
                .end(
                    function(err, res) {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('message');
                        done();
                    }
                )
        })
        it("Debe rechazar la imagen por inexistencia", (done) => {
            chai.request(url)
                .get('/image-albums/62ccf7258350a09d22af73dd')
                .set('Authorization', `${Authorization}`)
                .end(
                    function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message').to.be.equal('El álbum no existe');
                        done();
                    }
                )
        })
        it("Debe rechazar la imagen por id erróneo", (done) => {
            chai.request(url)
                .get('/image-albums/62ccf7258350a0f73dd')
                .set('Authorization', `${Authorization}`)
                .end(
                    function(err, res) {
                        expect(res).to.have.status(400);
                        expect(res.body).to.have.property('message').to.be.equal('MonngoId inválido');
                        done();
                    }
                )
        })
    });

});