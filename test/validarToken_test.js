const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);
const token = "$2b$10$vE9rXIESwxPonAcrjuE9XuQr97U0Q7bpBqZv7q-E8r6.LmRozaS5O";

const dotenv = require('dotenv').config();
const url = process.env.URL;
describe('Validar token', () => {
    it('Token Valido -IsValid:true', (done) => {
        chai.request(url)
            .post('/validate-token')
            .send({
                token: token
            })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message').to.equal("Ingrese una nueva contraseña")
                done();

            })

    })
    it('Token invalido o expirado', (done) => {
        chai.request(url)
            .post('/validate-token')
            .send({
                token: token + "sd"
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("El link de restablecimiento es inválido o ha expirado")
                done();

            })

    })





})