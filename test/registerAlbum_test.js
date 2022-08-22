let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
describe('Albums', () => {
    describe('Agregar nuevo álbum: ', () => {
        it('Agregar álbum con usuario autorizado', (done) => {
            chai.request(url)
                .post('/new-album')
                .set({ Authorization: token })
                .send({
                    title: "30909sd",
                    description: "Es el cuarto albúm de estudio de la cantautora britanica Adele",
                    year: 2015,
                    artist: "62c51183877c69d1bee73ee5"
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal("Album registrado");
                    done();
                });
        });
        it('Debe rechazar agregar album a usuario no autenticado', (done) => {
            chai.request(url)
                .post('/new-album')
                .send({
                    title: "Revival",
                    description: "Es el quinto albúm de estudio y el segundo como solista",
                    year: 2015,
                    artist: "62c510a1877c69d1bee73ed9"
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar agregar álbum con datos faltantes', (done) => {
            chai.request(url)
                .post('/new-album')
                .set({ Authorization: token })
                .send({
                    title: "",
                    description: "",
                    year: 2015,
                    artist: "62c510a1877c69d1bee73ed9"
                })
                .end(function(err, res) {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

    });

});