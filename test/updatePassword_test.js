const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const url = 'http://localhost:8000';

describe('Guardar nueva contraseña', () => {

    it('Guardar nueva contraseña - Password requerido', (done) => {
        chai.request(url)
            .post('/api/update-password')
            .send({
                token: "$2b$10$9zmTD.odkVneRa.9mY4ojeqd6apqBwVjyVXMxiaiUfx7GiWfh.aam"

            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("La contraseña es obligatoria")
                done();

            })

    })
    it('Guardar nueva contraseña - token valido', (done) => {
        chai.request(url)
            .post('/api/update-password')
            .send({
                token: "$2b$10$9zmTD.odkVneRa.9mY4ojeqd6apqBwVjyVXMxiaiUfx7GiWfh.aam",
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
            .post('/api/update-password')
            .send({
                token: "$2b$10$9zmTD.odkVneRa.9mY4ojeqd6apqBwVjyVXMxiaiUfx7GiWfh.aam" + "jdfkl",
                password: 'asde456'

            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("El link de restablecimiento es inválido o ha expirado")
                done();

            })

    })





})