let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';

describe('Artista', () => {
    describe('Eliminar artista: ', () => {
        it('Eliminar artista con usuario autenticado', (done) => {
            chai.request(url)
                .delete('/delete-artist/62ff17d02ebedf23b33c07b0')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal("Artista eliminado");
                    done();
                });
        });
        it('Debe rechazar eliminar un artista a un usuario no autenticado', (done) => {
            chai.request(url)
                .delete('/delete-artist/62c51231877c69d1bee73ef4')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar eliminar un artista con un id inexistente', (done) => {
            chai.request(url)
                .delete('/delete-artist/62c5128d877c69d1bee73f01')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').to.equal("Artista no encontrado");
                    done();
                });
        });

    });
});