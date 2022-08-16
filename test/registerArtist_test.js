let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmNDQ4YmJiN2IzMGJhZDgxZWY4ZTg0IiwiaWF0IjoxNjYwMTc3MjM5LCJleHAiOjE2NjI3NjkyMzl9.ijq3CgduT1b7w8rNQTRwvlNrJ3ZH5s5CNJsT87NYjbU"
describe('Artista', () => {
   describe('Agregar nuevo artista: ',()=>{
    /*it('Agregar artista con usuario autenticado', (done) => {
    chai.request(url)
    .post('/new-artist')
    .set({Authorization: token})
    .send({
        name: "Jenni Rivera",
        description: "Janney Dolores Rivera Saavedra, conocida artisticamente como Jenni Rivera",
    })
    .end( function(err,res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal("Artista registrado");
    done();
    });
    });*/
    it('Debe rechazar agregar artista a usuario no autenticado', (done) => {
    chai.request(url)
    .post('/new-artist')
    .send({
        name: "Paquita la del barrio",
        description: "Francisca Viveros Barradas, más conocida como su nombre artístico Paquita la del Barrio",
    })
    .end( function(err,res){
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
    done();
    });
    });
    it('Debe rechazar agregar artista con datos faltantes', (done) => {
    chai.request(url)
    .post('/new-artist')
    .set({Authorization: token})
    .send({
        name: "",
        description:"" ,
    })
    .end( function(err,res){
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message');
    done();
    });
    });
   });
});