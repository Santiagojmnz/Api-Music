let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
describe('Artista', () => {
    describe('Agregar nuevo artista: ', () => {
        it('Agregar artista con usuario autenticado', (done) => {
            chai.request(url)
                .post('/new-artist')
                .set({ Authorization: token })
                .send({
                    name: "Jenni Rivera6",
                    description: "Janney Dolores Rivera Saavedra, conocida artisticamente como Jenni Rivera",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal("Artista registrado");
                    done();
                });
        });
        it('Debe rechazar agregar artista a usuario no autenticado', (done) => {
            chai.request(url)
                .post('/new-artist')
                .send({
                    name: "Paquita la del barrio",
                    description: "Francisca Viveros Barradas, más conocida como su nombre artístico Paquita la del Barrio",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar agregar artista con datos faltantes', (done) => {
            chai.request(url)
                .post('/new-artist')
                .set({ Authorization: token })
                .send({
                    name: "",
                    description: "",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });
});