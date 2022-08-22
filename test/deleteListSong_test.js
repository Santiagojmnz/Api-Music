let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
describe('listSong', () => {
    describe('Eliminar canción listada: ', () => {
        it('Eliminar canción listada con usuario autenticado', (done) => {
            chai.request(url)
                .delete('/quit-song/62ff18092ebedf23b33c07b3')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('message').to.equal("Canción eliminada de la lista de reproducción");
                    done();
                });
        });
        it('Debe rechazar eliminar una canción listada a un usuario no autenticado', (done) => {
            chai.request(url)
                .delete('/quit-song/62f5dbae6b6bfb3948b433e3')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar eliminar un artista con un id inexistente', (done) => {
            chai.request(url)
                .delete('/quit-song/62e866f68d8e038e4a41301b')
                .set({ Authorization: token })
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').to.equal("Canción no encontrada");
                    done();
                });
        });

    });
});