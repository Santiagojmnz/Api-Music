let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const dotenv = require('dotenv').config();
const url = process.env.URL;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';

describe('listSong', () => {
    describe('Listar una canción: ', () => {
        it('Listar canción a un usuario autenticado', (done) => {
            chai.request(url)
                .post('/add-song')
                .set({ Authorization: token })
                .send({
                    playlist: "62ec93fa675475d69d10822d",
                    song: "62c5c2475953b5aebc87acea",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal("Canción listada");
                    done();
                });
        });
        it('Debe rechazar  listar canción a usuario no autenticado', (done) => {
            chai.request(url)
                .post('/add-song')
                .send({
                    playlist: "62e866558d8e038e4a413017",
                    song: "62c5c2475953b5aebc87acea",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar listar cancion con datos faltantes', (done) => {
            chai.request(url)
                .post('/add-song')
                .set({ Authorization: token })
                .send({
                    playlist: "",
                    song: "62c5c2475953b5aebc87acea",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message').to.equal("Por favor ingrese los campos obligatorios (*) faltantes");
                    done();
                });
        });
    });
});