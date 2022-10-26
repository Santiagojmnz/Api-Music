const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require('dotenv').config();
const url = process.env.URL;

describe('Registro de usuario', () => { //Se definen bloques de pruebas
    it('Debe registrar un nuevo usuario', (done) => { //Caso de prueba o esenario
        chai.request(url) //Ruta base
            .post('/new-user') //Enpoint y metodo
            .send({ //Send informacion a enviar
                name: 'Francisco',
                surname: 'Neri',
                email: "francisco_neri@gmail.com",
                password: 'abc'

            })
            .end((error, response) => {
                expect(response).to.have.status(200); //Se espera  obtener en la reponse un status 200
                expect(response.body).to.have.property('message').to.equal("Usuario registrado - Confirmar cuenta"); // se espera en el reques.body  la propiedad mensaje con un mensaje especifico
                done(); //indicar que se completo la prueba 

            })
    })
    it('Debe rechazar el registro - usuario existente', (done) => {
        chai.request(url)
            .post('/new-user')
            .send({
                name: 'Santiago',
                surname: 'Jimenez',
                email: "jmnzsantiago@gmail.com",
                password: 'asde456'

            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message')
                done();

            })

    })
    it('Debe rechazar el registro de usuario - información faltante', (done) => {
        chai.request(url)
            .post('/new-user')
            .send({
                name: '',
                surname: 'Dominguez',
                email: "abc@gmail.coms",
                password: 'abc'
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("Por favor ingrese los campos obligatorios (*) faltantes")
                done();

            })

    })
    it('Debe rechazar el registro de usuario - Email invalido', (done) => {
        chai.request(url)
            .post('/new-user')
            .send({
                name: 'Juan',
                surname: 'Dominguez',
                email: "abc@gmail",
                password: 'abc'

            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("Ingresa un email válido")
                done();

            })

    })
})