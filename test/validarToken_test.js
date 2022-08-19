const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);
const token = "$2b$10$5QwdE.img-wliJTacZCsLesJYGphQ7u4lMV1CYoEZLTOqtpU8fC0W";

const url = 'http://localhost:8000';
describe('Validar token', () => {
    it('Token Valido -IsValid:true', (done) => {
        chai.request(url)
            .post('/api/validate-token')
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
            .post('/api/validate-token')
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