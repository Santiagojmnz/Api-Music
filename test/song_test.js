let chai = require("chai");
let chaiHTTP = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHTTP);
const url = "http://localhost:8000/api";
const Authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJiY2FjNDAwMjUwYzgxNDM0NDBhMjVmIiwiaWF0IjoxNjU5MzE4NDEyLCJleHAiOjE2NjE5MTA0MTJ9.eou4yXQHt6G2jpYbPk17f61LG1_QHa23iP6kYn31TVE";

describe("Pruebas a Song (almacenar canción)", () => {
    describe("Agregar canción", () => {
        // it("Debe almacenar la canción", (done) => {
        //     chai.request(url)
        //     .post('/new-song')
        //     .set('Authorization', `${Authorization}`)
        //     .field('Content-Type', 'multipart/form-data')
        //     .field({
        //         "name" : "prelude",
        //         "number" : "1",
        //         "album": "62c7b30143432840ef614684"})
        //     .attach("file", "/Users/JOSEFRANCO/Music/TheFatRat_-_Prelude.mp3")
        //     .end(
        //         function(err, res){
        //             expect(res).to.have.status(200);
        //             expect(res.body).to.have.property('message').to.be.equal('Canción registrada');
        //             done();
        //         }
        //     )
        // })
        // it("Debe rechazar almacenar la canción por falta de credenciales", (done) => {
        //     chai.request(url)
        //     .post('/new-song')
        //     .field('Content-Type', 'multipart/form-data')
        //     .field({
        //         "name" : "prelude",
        //         "number" : "1",
        //         "album": "62c7b30143432840ef614684"})
        //     .attach("file", "/Users/JOSEFRANCO/Music/TheFatRat_-_Prelude.mp3")
        //     .end(
        //         function(err, res){
        //             expect(res).to.have.status(403);
        //             expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
        //             done();
        //         }
        //     )
        // })
        // it("Debe rechazar almacenar la canción por campos vacíos", (done) => {
        //     chai.request(url)
        //     .post('/new-song')
        //     .set('Authorization', `${Authorization}`)
        //     .field('Content-Type', 'multipart/form-data')
        //     .field({
        //         "name" : "",
        //         "number" : "1",
        //         "album": "62c7b30143432840ef614684"})
        //     .attach("file", "/Users/JOSEFRANCO/Music/TheFatRat_-_Prelude.mp3")
        //     .end(
        //         function(err, res){
        //             expect(res).to.have.status(500);
        //             expect(res.body).to.have.property('message').to.be.equal('Por favor ingrese los campos obligatorios (*) faltantes');
        //             done();
        //         }
        //     )
        // })
        it("Debe rechazar almacenar la canción por ausencia de archivo", (done) => {
            chai.request(url)
                .post('/new-song')
                .set('Authorization', `${Authorization}`)
                .field('Content-Type', 'multipart/form-data')
                .field({
                    "name": "hola",
                    "number": "1",
                    "album": "62c7b30143432840ef614684"
                })
                .end(
                    function (err, res) {
                        expect(res).to.have.status(400);
                        expect(res.body).to.have.property('message').to.be.equal('Falta el archivo de audio');
                        done();
                    }
                )
        })
        it("Debe rechazar la canción por ausencia de campos", (done) => {
            chai.request(url)
                .post('/new-song')
                .set('Authorization', `${Authorization}`)
                .field('Content-Type', 'multipart/form-data')
                .field({
                    "name": "hola",
                    "album": "62c7b30143432840ef614684"
                })
                .attach("file", "/Users/JOSEFRANCO/Music/TheFatRat_-_Prelude.mp3")
                .end(
                    function (err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.have.property('message').to.be.equal('Por favor ingrese los campos obligatorios (*) faltantes');
                        done();
                    }
                )
        })
    });
    //Pruebas update
    describe("Actualizar canción", () => {
        // it("Debe actualizar la canción sin archivo", (done) => {
        //     chai.request(url)
        //     .put('/update-song/62cdeda3c33785ba103b7e83')
        //     .set('Authorization', `${Authorization}`)
        //     .send({
        //         "name" : "nekozila",
        //         "number" : "1",
        //         "album": "62c7b30143432840ef614684"
        //     })
        //     .end(
        //         function(err, res){
        //             expect(res).to.have.status(200);
        //             expect(res.body).to.have.property('message').to.be.equal('Canción actualizada');
        //             done();
        //         }
        //     )
        // })
        // it("Debe actualizar la canción con archivo", (done) => {
        //     chai.request(url)
        //     .put('/update-song/62cdeda3c33785ba103b7e83')
        //     .set('Authorization', `${Authorization}`)
        //     .field('Content-Type', 'multipart/form-data')
        //     .field({
        //         "name" : "prelude",
        //         "number" : "1",
        //         "album": "62c7b30143432840ef614684"})
        //     .attach("file", "/Users/JOSEFRANCO/Music/TheFatRat_-_Prelude.mp3")
        //     .end(
        //         function(err, res){
        //             expect(res).to.have.status(200);
        //             expect(res.body).to.have.property('message').to.be.equal('Canción actualizada');
        //             done();
        //         }
        //     )
        // })
        // it("Debe rechazar la actualización de canción por falta de credenciales", (done) => {
        //     chai.request(url)
        //     .put('/update-song/62cdeda3c33785ba103b7e83')
        //     .send({
        //         "name" : "hola",
        //         "number" : "1",
        //         "album": "62c7b30143432840ef614684"
        //     })
        //     .end(
        //         function(err, res){
        //             expect(res).to.have.status(403);
        //             expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
        //             done();
        //         }
        //     )
        // })
        // it("Debe rechazar la actualización de canción por campos vacíos", (done) => {
        //     chai.request(url)
        //     .put('/update-song/62cdeda3c33785ba103b7e83')
        //     .set('Authorization', `${Authorization}`)
        //     .send({
        //         "name" : "hola",
        //         "number" : "1",
        //         "album": ""
        //     })
        //     .end(
        //         function(err, res){
        //             expect(res).to.have.status(500);
        //             expect(res.body).to.have.property('message').to.be.equal('Por favor ingrese los campos obligatorios (*) faltantes');
        //             done();
        //         }
        //     )
        // })
        it("Debe rechazar la actualización de canción por ausencia de campos", (done) => {
            chai.request(url)
                .put('/update-song/62cdeda3c33785ba103b7e83')
                .set('Authorization', `${Authorization}`)
                .send({
                    "name": "hola",
                    "number": "1"
                })
                .end(
                    function (err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.have.property('message').to.be.equal('Por favor ingrese los campos obligatorios (*) faltantes');
                        done();
                    }
                )
        })
        it("Debe rechazar la actualización de canción por id erróneo", (done) => {
            chai.request(url)
                .put('/update-song/62cdeda3c33785ba103b7e83')
                .set('Authorization', `${Authorization}`)
                .send({
                    "name": "nekozila",
                    "number": "1",
                    "album": "62c7b30143432840ef614684"
                })
                .end(
                    function (err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.have.property('message').to.be.equal('Por favor ingrese los campos obligatorios (*) faltantes');
                        done();
                    }
                )
        })
    });
    //Pruebas delete
    describe("Eliminar canción ", () => {
        // it("Debe eliminar la canción", (done) => {
        //     chai.request(url)
        //         .delete('/delete-song/62e76e928a3dd7faddfddeeb')
        //         .set('Authorization', `${Authorization}`)
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(200);
        //                 expect(res.body).to.have.property('message').to.be.equal('Canción eliminada');
        //                 done();
        //             }
        //         )
        // })
        // it("Debe rechazar la eliminación de canción por falta de credenciales", (done) => {
        //     chai.request(url)
        //         .delete('/delete-song/62e76e928a3dd7faddfddeeb')
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(403);
        //                 expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
        //                 done();
        //             }
        //         )
        // })
        // it("Debe rechazar la eliminación de canción por inexistencia", (done) => {
        //     chai.request(url)
        //         .delete('/delete-song/62e76e928a3dd7faddfdde7b')
        //         .set('Authorization', `${Authorization}`)
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(404);
        //                 expect(res.body).to.have.property('message').to.be.equal('Canción no encontrada');
        //                 done();
        //             }
        //         )
        // })
        it("Debe rechazar la eliminación de canción por id erróneo", (done) => {
            chai.request(url)
                .delete('/delete-song/62e76e928a3dd7faddfdde7b')
                .set('Authorization', `${Authorization}`)
                .end(
                    function (err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message').to.be.equal('Canción no encontrada');
                        done();
                    }
                )
        })
    });
    //Pruebas get all
    describe("Obtener todas las canciones", () => {
        // it("Debe obtener las canciones", (done) => {
        //     chai.request(url)
        //         .get('/songs')
        //         .set('Authorization', `${Authorization}`)
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(200);
        //                 done();
        //             }
        //         )
        // })
        // it("Debe rechazar la petición por falta de credenciales", (done) => {
        //     chai.request(url)
        //         .get('/songs')
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(403);
        //                 expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
        //                 done();
        //             }
        //         )
        // })
    });
    //Pruebas get song
    describe("Obtener una cancion", () => {
        // it("Debe obtener la canción", (done) => {
        //     chai.request(url)
        //         .get('/song/9e03088111efdf83.mp3')
        //         .set('Authorization', `${Authorization}`)
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(200);
        //                 done();
        //             }
        //         )
        // })
        // it("Debe rechazar la petición por falta de credenciales", (done) => {
        //     chai.request(url)
        //         .get('/song/9e03088111efdf83.mp3')
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(403);
        //                 expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
        //                 done();
        //             }
        //         )
        // })
        // it("Debe rechazar la petición por inexistencia", (done) => {
        //     chai.request(url)
        //         .get('/song/9e03088111efdff3.mp3')
        //         .set('Authorization', `${Authorization}`)
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(404);
        //                 expect(res.body).to.have.property('message').to.be.equal('No se encontró la canción');
        //                 done();
        //             }
        //         )
        // })
    });
    //Pruebas get paginate
    describe("Obtener todas las canciones", () => {
        // it("Debe obtener las canciones de la pagina 1", (done) => {
        //     chai.request(url)
        //         .get('/songs/1')
        //         .set('Authorization', `${Authorization}`)
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(200);
        //                 done();
        //             }
        //         )
        // })
        // it("Debe rechazar la petición por falta de credenciales", (done) => {
        //     chai.request(url)
        //         .get('/songs/2')
        //         .end(
        //             function (err, res) {
        //                 expect(res).to.have.status(403);
        //                 expect(res.body).to.have.property('message').to.be.equal('La petición no tiene la cabecera de autenticación');
        //                 done();
        //             }
        //         )
        // })
    });

});