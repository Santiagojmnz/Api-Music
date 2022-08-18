let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmNDQ4YmJiN2IzMGJhZDgxZWY4ZTg0IiwiaWF0IjoxNjYwMTc3MjM5LCJleHAiOjE2NjI3NjkyMzl9.ijq3CgduT1b7w8rNQTRwvlNrJ3ZH5s5CNJsT87NYjbU"
describe('Albums', () => {
describe('Listar álbums por paginación: ',()=>{
    it('Listar álbums por paginación con usuario autenticado', (done) => {
        chai.request(url)
        .get('/albums/2')
        .set({Authorization: token})
        .end( function(err,res){
            expect(res).to.have.status(200);
        done();
        });
        }); 
    it('Debe rechazar listar álbums por paginación a usuario no autenticado', (done) => {
    chai.request(url)
    .get('/albums/2')
    .end( function(err,res){
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
    done();
    });
    });

   });
});