const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const url = 'http://localhost:8000';
describe('Validar token', () => {
    it('Token Valido -IsValid:true', (done) => {
        chai.request(url)
            .post('/api/validate-token')
            .send({
                token: "$2b$10$9zmTD.odkVneRa.9mY4ojeqd6apqBwVjyVXMxiaiUfx7GiWfh.aam"
            })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message').to.equal("Ingrese una nueva contraseña")
                done();

            })

    })
    it('Token invalido o expirado', (done) => {
        chai.request(url)
            .post('/api/validate-token')
            .send({
                token: "$2b$10$XE-6aL-svcBqrW5.16Pl7u.-IjCQ9b8kg5o7ZjNwrBQKSRhfV10DC1"
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("El link de restablecimiento es inválido o ha expirado")
                done();

            })

    })





})