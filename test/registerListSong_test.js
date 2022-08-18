let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmNDQ4YmJiN2IzMGJhZDgxZWY4ZTg0IiwiaWF0IjoxNjYwMTc3MjM5LCJleHAiOjE2NjI3NjkyMzl9.ijq3CgduT1b7w8rNQTRwvlNrJ3ZH5s5CNJsT87NYjbU"
describe('listSong', () => {
   describe('Listar una canción: ',()=>{
        it('Listar canción a un usuario autenticado', (done) => {
        chai.request(url)
        .post('/add-song')
        .set({Authorization: token})
        .send({
            playlist: "62e867048d8e038e4a41301f",
            song: "62fc307c67b349ad5e878021",
        })
        .end( function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').to.equal("Canción listada");
        done();
        });
        });
        it('Debe rechazar  listar canción a usuario no autenticado', (done) => {
            chai.request(url)
            .post('/add-song')
            .send({
                playlist: "62e866558d8e038e4a413017",
                song: "62c5c2475953b5aebc87acea",
            })
            .end( function(err,res){
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
            done();
            });
        });
        it('Debe rechazar agregar álbum con datos faltantes', (done) => {
            chai.request(url)
            .post('/add-song')
            .set({Authorization: token})
            .send({
                playlist: "",
                song: "62c5c2475953b5aebc87acea",
            })
            .end( function(err,res){
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message').to.equal("Por favor ingrese los campos obligatorios (*) faltantes");
            done();
            });
        });
    });
});