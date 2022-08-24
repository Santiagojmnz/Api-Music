let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const dotenv = require('dotenv').config();
const url = process.env.URL;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';

describe('Artista', () => {
    describe('Listar artista por Id: ', () => {
        it('Listar artista por id con usuario autenticado', (done) => {
            chai.request(url)
                .get('/artist/62c5105a877c69d1bee73ed0')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Debe rechazar listar artista por id a usuario no autenticado', (done) => {
            chai.request(url)
                .get('/artist/62c5105a877c69d1bee73ed0')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar listar artista por Id con id inexistente', (done) => {
            chai.request(url)
                .get('/artist/62c5105a877c69d1bee73ed1')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').to.equal("No se encontró el álbum");
                    done();
                });
        });

    });
});