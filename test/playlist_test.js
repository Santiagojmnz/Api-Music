let chai = require("chai");
let chaiHTTP = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHTTP);
const url = "http://localhost:8000/api";
const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';

describe("Pruebas a Playlist", () => {
    describe("Agregar playlist ", () => {
        it("Debe almacenar la Playlist", (done) => {
            chai.request(url)
                .post('/new-playlist')
                .set('Authorization', `${Authorization}`)
                .send({
                    "name": "nueva lista345",
                    "user": "62bcbeb6f264341814de5619"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción creada');
                        done();
                    }
                )
        })
        it("Debe rechazar almacenar la Playlist por duplicidad", (done) => {
            chai.request(url)
                .post('/new-playlist')
                .set('Authorization', `${Authorization}`)
                .send({
                    "name": "nueva lista",
                    "user": "62bcbeb6f264341814de5619"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(400);
                        expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción existente');
                        done();
                    }
                )
        })
        it("Debe rechazar almacenar la playlist por falta de credenciales", (done) => {
            chai.request(url)
                .post('/new-playlist')
                .send({
                    "name": "nueva lista 2",
                    "user": "62bcbeb6f264341814de5619"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                        done();
                    }
                )
        })
        it("Debe rechazar almacenar la playlist por campos vacíos", (done) => {
            chai.request(url)
                .post('/new-playlist')
                .set('Authorization', `${Authorization}`)
                .send({
                    "name": "",
                    "user": "62bcbeb6f264341814de5619"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.have.property('message').to.be.equal('Por favor ingrese los campos obligatorios (*) faltantes');
                        done();
                    }
                )
        })
        it("Debe rechazar almacenar la playlist por ausencia de campos", (done) => {
            chai.request(url)
                .post('/new-playlist')
                .set('Authorization', `${Authorization}`)
                .send({
                    "user": "62bcbeb6f264341814de5619"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.have.property('message').to.be.equal('Por favor ingrese los campos obligatorios (*) faltantes');
                        done();
                    }
                )
        })
    });
    //Pruebas update
    describe("Actualizar playlist ", () => {
        it("Debe actualizar la Playlist", (done) => {
            chai.request(url)
                .put('/update-play-list/62e76fe5b42385dce677bf67')
                .set('Authorization', `${Authorization}`)
                .send({
                    "name": "Mi lista",
                    "user": "62bcac400250c8143440a25f"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción actualizada');
                        done();
                    }
                )
        })
        it("Debe rechazar actualizar la Playlist por duplicidad", (done) => {
            chai.request(url)
                .put('/update-play-list/62e7716b22e2b7f56f2727da')
                .set('Authorization', `${Authorization}`)
                .send({
                    "name": "nueva lista",
                    "user": "62bcbeb6f264341814de5619"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(400);
                        expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción existente');
                        done();
                    }
                )
        })
        it("Debe rechazar la actualización de playlist por falta de credenciales", (done) => {
            chai.request(url)
                .put('/update-play-list/62e76fe5b42385dce677bf67')
                .send({
                    "name": "Mi lista",
                    "user": "62bcac400250c8143440a25f"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                        done();
                    }
                )
        })
        it("Debe rechazar la actualización de playlist por campos vacíos", (done) => {
            chai.request(url)
                .put('/update-play-list/62e76fe5b42385dce677bf67')
                .set('Authorization', `${Authorization}`)
                .send({
                    "name": "",
                    "user": "62bcac400250c8143440a25f"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.have.property('message').to.be.equal('Por favor ingrese los campos obligatorios (*) faltantes');
                        done();
                    }
                )
        })
        it("Debe rechazar la actualización de playlist por ausencia de campos", (done) => {
            chai.request(url)
                .put('/update-play-list/62e76fe5b42385dce677bf67')
                .set('Authorization', `${Authorization}`)
                .send({
                    "name": "Favs"
                })
                .end(
                    function(err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.have.property('message').to.be.equal('Por favor ingrese los campos obligatorios (*) faltantes');
                        done();
                    }
                )
        })
    });
    //Pruebas delete
    describe("Eliminar playlist ", () => {
        it("Debe eliminar la Playlist", (done) => {
            chai.request(url)
                .delete('/delete-playlist/62ff190c2ebedf23b33c07b6')
                .set('Authorization', `${Authorization}`)
                .end(
                    function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción eliminada');
                        done();
                    }
                )
        })
        it("Debe rechazar la eliminación de playlist por falta de credenciales", (done) => {
            chai.request(url)
                .delete('/delete-playlist/62ff06bab3bbc3bf84d7b901')
                .end(
                    function(err, res) {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                        done();
                    }
                )
        })
        it("Debe rechazar la eliminación de playlist por inexistencia", (done) => {
            chai.request(url)
                .delete('/delete-playlist/62e77007b42385dce677bf70')
                .set('Authorization', `${Authorization}`)
                .end(
                    function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción no encontrada');
                        done();
                    }
                )
        })
        it("Debe rechazar la eliminación de playlist por id erróneo", (done) => {
            chai.request(url)
                .delete('/delete-playlist/uno')
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
    //Pruebas get
    describe("Obtener todas las playlist", () => {
        it("Debe obtener las playlist's", (done) => {
            chai.request(url)
                .get('/playlist')
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
                .get('/playlist')
                .end(
                    function(err, res) {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                        done();
                    }
                )
        })
    });
    //Pruebas get
    describe("Obtener una playlist de un usuario", () => {
        it("Debe obtener la playlist por id", (done) => {
            chai.request(url)
                .get('/playlist/62e7716b22e2b7f56f2727da')
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
                .get('/playlist/62e7716b22e2b7f56f2727da')
                .end(
                    function(err, res) {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                        done();
                    }
                )
        })
        it("Debe rechazar la petición por inexistencia", (done) => {
            chai.request(url)
                .get('/playlist/62e7716b22e2b7f56f2727dd')
                .set('Authorization', `${Authorization}`)
                .end(
                    function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message').to.be.equal('No se encontró la lista de reproducción');
                        done();
                    }
                )
        })
        it("Debe rechazar la petición por id erróneo", (done) => {
            chai.request(url)
                .get('/playlist/1')
                .set('Authorization', `${Authorization}`)
                .end(
                    function(err, res) {
                        expect(res).to.have.status(400);
                        expect(res.body).to.have.property('message').to.be.equal('MonngoId inválido');
                        done();
                    }
                )
        })
    });;

});