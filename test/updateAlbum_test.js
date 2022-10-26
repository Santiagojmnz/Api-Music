let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const dotenv = require('dotenv').config();
const url = process.env.URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
describe('Albums', () => {
    describe('Actualizar álbum: ', () => {
        it('Actualizar álbum con usuario autorizado', (done) => {
            chai.request(url)
                .put('/update-album/62c50fad877c69d1bee73ec4')
                .set({ Authorization: token })
                .send({
                    title: "El Tapatío",
                    description: "Es el sexto albúm como solista",
                    year: 2016,
                    artist: "62c4f113f83c645a3aa6ff58"
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').to.equal("Álbum actualizado");
                    done();
                });
        });
        it('Debe rechazar actualizar album a usuario no autenticado', (done) => {
            chai.request(url)
                .put('/update-album/62c50fad877c69d1bee73ec4')
                .send({
                    title: "El tapatio",
                    description: "Es el quinto albúm como solista",
                    year: 1996,
                    artist: "62c4f113f83c645a3aa6ff58"
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                    done();
                });
        });
        it('Debe rechazar actualizar álbum con datos faltantes', (done) => {
            chai.request(url)
                .put('/update-album/62c50fad877c69d1bee73ec4')
                .set({ Authorization: token })
                .send({
                    title: "",
                    description: "",
                    year: 1996,
                    artist: "62c4f113f83c645a3aa6ff58"
                })
                .end(function(err, res) {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

    });

});