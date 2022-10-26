let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const dotenv = require('dotenv').config();
const url = process.env.URL;
chai.use(chaiHttp);


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
describe('Albums', () => {
    describe('Eliminar álbum: ', () => {
        it('Eliminar álbum con usuario autorizado', (done) => {
            chai.request(url)
                .delete('/delete-album/62ff20d7f2ae4e0de5ee298f')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal("Álbum eliminado");
                    done();
                });
        });
        it('Debe rechazar eliminar un álbum a un usuario no autenticado', (done) => {
            chai.request(url)
                .delete('/delete-album/62c51345877c69d1bee73f0d')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar eliminar un álbum con un id inexistente', (done) => {
            chai.request(url)
                .delete('/delete-album/62c51231877c69d1bee73ef4')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').to.equal("Álbum no encontrado");
                    done();
                });
        });

    });
});