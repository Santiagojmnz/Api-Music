const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const url = 'http://localhost:8000';

describe('Recuperar Contraseña - Envío de email de recuperación', () => {
    it('Debe enviar el email de recuperación', (done) => {
        chai.request(url)
            .post('/api/restore-password')
            .send({
                email: "osoriof543@gmail.com",
            })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message').to.equal("Correo electrónico enviado , revisa tu bandeja de entrada ")
                done();

            })

    })

    it('No debe enviar el email de recuperación - usuario no existe en base de datos', (done) => {
        chai.request(url)
            .post('/api/restore-password')
            .send({
                email: "jimnzsantiago123@gmail.com",
            })
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message').to.equal("No se encontró el correo electrónico en la base de datos")
                done();

            })

    })

    it('No debe enviar el email de recuperación - Email inválido', (done) => {
        chai.request(url)
            .post('/api/restore-password')
            .send({
                email: "abc@gmail",
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("Ingresa un email válido")
                done();

            })

    })




})