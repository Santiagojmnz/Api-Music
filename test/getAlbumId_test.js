let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const dotenv = require('dotenv').config();
const url = process.env.URL;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
describe('Albums', () => {
    describe('Listar álbums por Id: ', () => {
        it('Listar álbums por id con usuario autenticado', (done) => {
            chai.request(url)
                .get('/album/62c4fc643c797b0d77491743')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Debe rechazar listar albums por id a usuario no autenticado', (done) => {
            chai.request(url)
                .get('/album/62c4fc643c797b0d77491743')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar listar álbum por Id con id inexistente', (done) => {
            chai.request(url)
                .get('/album/62c4fc643c797b0d77491742')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').to.equal("No se encontró el álbum");
                    done();
                });
        });

    });
});