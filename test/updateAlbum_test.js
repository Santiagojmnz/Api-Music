let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:8000/api';

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmNDQ4YmJiN2IzMGJhZDgxZWY4ZTg0IiwiaWF0IjoxNjYwMTc3MjM5LCJleHAiOjE2NjI3NjkyMzl9.ijq3CgduT1b7w8rNQTRwvlNrJ3ZH5s5CNJsT87NYjbU"
describe('Albums', () => {
   describe('Actualizar álbum: ',()=>{
    /*it('Actualizar álbum con usuario autorizado', (done) => {
        chai.request(url)
        .put('/update-album/62c50fad877c69d1bee73ec4')
        .set({Authorization: token})
        .send({
            title: "El Tapatío",
            description: "Es el sexto albúm como solista",
            year: 2016,
            artist: "62c4f113f83c645a3aa6ff58"
        })
        .end( function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message');
        done();
        });
        });*/
    it('Debe rechazar actualizar album a usuario no autenticado', (done) => {
    chai.request(url)
    .put('/update-album/62c50fad877c69d1bee73ec4')
    .send({
        title: "El tapatio",
        description: "Es el quinto albúm como solista",
        year: 1996,
        artist: "62c4f113f83c645a3aa6ff58"
    })
    .end( function(err,res){
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
    done();
    });
    });
    it('Debe rechazar actualizar álbum con datos faltantes', (done) => {
        chai.request(url)
        .put('/update-album/62c50fad877c69d1bee73ec4')
        .set({Authorization: token})
        .send({
            title: "",
            description: "",
            year: 1996,
            artist: "62c4f113f83c645a3aa6ff58"
        })
        .end( function(err,res){
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('message').to.equal("Por favor ingrese los campos obligatorios (*) faltantes");
        done();
        });
        });

   });

});