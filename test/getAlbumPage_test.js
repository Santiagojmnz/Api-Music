let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
describe('Albums', () => {
    describe('Listar álbums por paginación: ', () => {
        it('Listar álbums por paginación con usuario autenticado', (done) => {
            chai.request(url)
                .get('/albums/2')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Debe rechazar listar álbums por paginación a usuario no autenticado', (done) => {
            chai.request(url)
                .get('/albums/2')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });

    });
});