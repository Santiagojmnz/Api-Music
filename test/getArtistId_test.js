let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmNDQ4YmJiN2IzMGJhZDgxZWY4ZTg0IiwiaWF0IjoxNjYwMTc3MjM5LCJleHAiOjE2NjI3NjkyMzl9.ijq3CgduT1b7w8rNQTRwvlNrJ3ZH5s5CNJsT87NYjbU"
describe('Artista', () => {
describe('Listar artista por Id: ',()=>{
    it('Listar artista por id con usuario autenticado', (done) => {
        chai.request(url)
        .get('/artist/62c5105a877c69d1bee73ed0')
        .set({Authorization: token})
        .end( function(err,res){
            expect(res).to.have.status(200);
        done();
        });
        }); 
    it('Debe rechazar listar artista por id a usuario no autenticado', (done) => {
    chai.request(url)
    .get('/artist/62c5105a877c69d1bee73ed0')
    .end( function(err,res){
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
    done();
    });
    });
    it('Debe rechazar listar artista por Id con id inexistente', (done) => {
        chai.request(url)
        .get('/artist/62c5105a877c69d1bee73ed1')
        .set({Authorization: token})
        .end( function(err,res){
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message').to.equal("No se encontró el álbum");
        done();
        });
        });

   });
});   