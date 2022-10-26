let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const dotenv = require('dotenv').config();
const url = process.env.URL;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';

describe('Artista', () => {
    describe('Listar artista por paginación: ', () => {
        it('Listar artista por paginación con usuario autenticado', (done) => {
            chai.request(url)
                .get('/artists/2')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Debe rechazar listar artista por paginación a usuario no autenticado', (done) => {
            chai.request(url)
                .get('/artist/2')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });

    });
});