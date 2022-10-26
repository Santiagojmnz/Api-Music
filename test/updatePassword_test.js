const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require('dotenv').config();
const url = process.env.URL;
const token = "$2b$10$vE9rXIESwxPonAcrjuE9XuQr97U0Q7bpBqZv7q-E8r6.LmRozaS5O";

describe('Guardar nueva contraseña', () => {

    it('Guardar nueva contraseña - Password requerido', (done) => {
        chai.request(url)
            .post('/update-password')
            .send({
                token: token

            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("La contraseña es obligatoria")
                done();

            })

    })
    it('Guardar nueva contraseña - token valido', (done) => {
        chai.request(url)
            .post('/update-password')
            .send({
                token: token,
                password: "asde456"
            })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message').to.equal("La nueva contraseña ha sido guardada")
                done();

            })

    })

    it('Guardar nueva contraseña - Token invalido o expirado', (done) => {
        chai.request(url)
            .post('/update-password')
            .send({
                token: token + "jdfkl",
                password: 'asde456'

            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("El link de restablecimiento es inválido o ha expirado")
                done();

            })

    })





})