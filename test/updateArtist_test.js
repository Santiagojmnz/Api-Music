let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const dotenv = require('dotenv').config();
const url = process.env.URL;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
describe('Artista', () => {
    describe('Actualizar artista: ', () => {
        it('Actualizar artista con usuario no autenticado', (done) => {
            chai.request(url)
                .put('/update-artist/62c4f0e8f83c645a3aa6ff55')
                .set({ Authorization: token })
                .send({
                    name: "Yoselin Olivares",
                    description: "Solista Mexicana de 28 años de edad",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal("Artista actualizado");
                    done();
                });
        });
        it('Debe rechazar actualizar artista a usuario no autenticado', (done) => {
            chai.request(url)
                .put('/update-artist/62c4f0e8f83c645a3aa6ff55')
                .send({
                    name: "Yoselin Olivares",
                    description: "Solista Mexicana",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar actualizar artista con campos faltantes', (done) => {
            chai.request(url)
                .put('/update-artist/62c4f0e8f83c645a3aa6ff55')
                .set({ Authorization: token })
                .send({
                    name: "",
                    description: "Solista Mexicana",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

    });
});