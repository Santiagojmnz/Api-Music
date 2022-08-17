let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmNDQ4YmJiN2IzMGJhZDgxZWY4ZTg0IiwiaWF0IjoxNjYwMTc3MjM5LCJleHAiOjE2NjI3NjkyMzl9.ijq3CgduT1b7w8rNQTRwvlNrJ3ZH5s5CNJsT87NYjbU"
describe('Artista', () => {
describe('Actualizar artista: ',()=>{
    it('Actualizar artista con usuario no autenticado', (done) => {
        chai.request(url)
        .put('/update-artist/62c4f0e8f83c645a3aa6ff55')
        .set({Authorization: token})
        .send({
            name: "Yoselin Olivares",
            description: "Solista Mexicana de 28 años de edad",
        })
        .end( function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').to.equal("Artista actualizado");
        done();
        });
        });
    it('Debe rechazar actualizar artista a usuario no autenticado', (done) => {
    chai.request(url)
    .put('/update-artist/62c4f0e8f83c645a3aa6ff55')
    .send({
        name: "Yoselin Olivares",
        description: "Solista Mexicana",
    })
    .end( function(err,res){
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
    done();
    });
    });
    it('Debe rechazar actualizar artista con campos faltantes', (done) => {
        chai.request(url)
        .put('/update-artist/62c4f0e8f83c645a3aa6ff55')
        .set({Authorization: token})
        .send({
            name: "",
            description: "Solista Mexicana",
        })
        .end( function(err,res){
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('message');
        done();
        });
        });

   });
});