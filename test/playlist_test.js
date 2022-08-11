let chai = require("chai");
let chaiHTTP = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHTTP);
const url = "http://localhost:8000/api";
const Authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJiY2FjNDAwMjUwYzgxNDM0NDBhMjVmIiwiaWF0IjoxNjU5MzE4NDEyLCJleHAiOjE2NjE5MTA0MTJ9.eou4yXQHt6G2jpYbPk17f61LG1_QHa23iP6kYn31TVE";

describe("Pruebas a Playlist", () => {
    describe("Agregar playlist ", () => {
        it("Debe almacenar la Playlist", (done) => {
            chai.request(url)
            .post('/new-playlist')
            .set('Authorization', `${Authorization}`)
            .send({
                "name":"nueva lista",
                "user": "62bcbeb6f264341814de5619"
            })
            .end(
                function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción creada');
                    done();
                }
            )
        })
        it("Debe rechazar la playlist por falta de credenciales", (done) => {
            chai.request(url)
            .post('/new-playlist')
            .send({
                "name":"nueva lista 2",
                "user": "62bcbeb6f264341814de5619"
            })
            .end(
                function(err, res){
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
                    done();
                }
            )
        })
        it("Debe rechazar la playlist por campos vacíos", (done) => {
            chai.request(url)
            .post('/new-playlist')
            .set('Authorization', `${Authorization}`)
            .send({
                "name":"",
                "user": "62bcbeb6f264341814de5619"
            })
            .end(
                function(err, res){
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
                "name":"Mi lista",
                "user": "62bcac400250c8143440a25f"
            })
            .end(
                function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción actualizada');
                    done();
                }
            )
        })
        it("Debe rechazar la actualización de playlist por falta de credenciales", (done) => {
            chai.request(url)
            .put('/update-play-list/62e76fe5b42385dce677bf67')
            .send({
                "name":"Mi lista",
                "user": "62bcac400250c8143440a25f"
            })
            .end(
                function(err, res){
                    expect(res).to.have.status(403);
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
                "name":"",
                "user": "62bcac400250c8143440a25f"
            })
            .end(
                function(err, res){
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
            .delete('/delete-playlist/62e77007b42385dce677bf72')
            .set('Authorization', `${Authorization}`)
            .end(
                function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción eliminada');
                    done();
                }
            )
        })
        it("Debe rechazar la eliminación de playlist por falta de credenciales", (done) => {
            chai.request(url)
            .delete('/delete-playlist/62e77007b42385dce677bf72')
            .end(
                function(err, res){
                    expect(res).to.have.status(403);
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
                function(err, res){
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').to.be.equal('Lista de reproducción no encontrada');
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
                function(err, res){
                    expect(res).to.have.status(200);
                    // expect(res.body).to.have.property('message');
                    done();
                }
            )
        })
        it("Debe rechazar la petición por falta de credenciales", (done) => {
            chai.request(url)
            .get('/playlist')
            .end(
                function(err, res){
                    expect(res).to.have.status(403);
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
                function(err, res){
                    expect(res).to.have.status(200);
                    done();
                }
            )
        })
        it("Debe rechazar la petición por falta de credenciales", (done) => {
            chai.request(url)
            .get('/playlist/62e7716b22e2b7f56f2727da')
            .end(
                function(err, res){
                    expect(res).to.have.status(403);
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
                function(err, res){
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message').to.be.equal('No se encontró la lista de reproducción');
                    done();
                }
            )
        })
    });;

});