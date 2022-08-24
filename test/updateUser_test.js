const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require('dotenv').config();
const url = process.env.URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
const tokenExpire = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgyMTY4LCJleHAiOjE2NjAyODIxNjh9.LgmUtjEkkcYTHmPd9hGqF7VKQzpuFPr4zUxpabCRqM0';

describe('Actualizar usuario', () => {
    it('Debe actualizar al usuario', (done) => {
        chai.request(url)
            .put('/update-user/62e7135742ffd95b9a61c558')
            .set({ 'Authorization': token })
            .send({
                name: 'Santiago',
                surname: 'Jimenez',
                email: 'jmnzsantiago@gmail.com',
                password: 'asde456'
            })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('user');
                expect(response.body).to.have.property('message').to.equal('Usuario actualizado');
                done();

            })
    })
    it('No debe actualizar el usuario - Usuario no existe', (done) => {
        chai.request(url)
            .put('/update-user/62e7135742ffd95b9a61c559')
            .set({ 'Authorization': token })
            .send({
                name: 'Santiago',
                surname: 'Jimenez',
                email: 'jmnzsantiago@gmail.com',
                password: 'asde456'
            })
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message').to.equal("El usuario no existe");
                done();

            })
    })
    it('No debe actualizar el usuario - MonngoId inválido', (done) => {
        chai.request(url)
            .put('/update-user/62e7135742ffd95b9a61c5599h')
            .set({ 'Authorization': token })
            .send({
                name: 'Santiago',
                surname: 'Jimenez',
                email: 'jmnzsantiago@gmail.com',
                password: 'asde456'
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("MonngoId inválido");
                done();

            })
    })
    it('No debe actualizar al usuario - Token expirado', (done) => {
        chai.request(url)
            .put('/update-user/62e7135742ffd95b9a61c558')
            .set({ 'Authorization': tokenExpire })
            .send({
                name: 'Santiago',
                surname: 'Jimenez',
                email: 'jmnzsantiago@gmail.com',
                password: 'asde456'
            })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token expirado");
                done();

            })
    })
    it('No debe actualizar al usuario - Token inválido', (done) => {
        chai.request(url)
            .put('/update-user/62e7135742ffd95b9a61c558')
            .set({ 'Authorization': token + "sd" })
            .send({
                name: 'Santiago',
                surname: 'Jimenez',
                email: 'jmnzsantiago@gmail.com',
                password: 'asde456'
            })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token no válido");
                done();

            })
    })
    it('No debe actualizar al usuario  - Sin cabecera de autenticación', (done) => {
        chai.request(url)
            .put('/update-user/62e7135742ffd95b9a61c558')
            .set({})
            .send({
                name: 'Santiago',
                surname: 'Jimenez',
                email: 'jmnzsantiago@gmail.com',
                password: 'asde456'
            })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                done();

            })
    })


    it('No debe actualizar al usuario - Email en uso', (done) => {
        chai.request(url)
            .put('/update-user/62f5b792d8e034a5c1d22b7e')
            .set({ 'Authorization': token })
            .send({
                name: 'Juan',
                surname: 'Dominguez',
                email: 'osoriof543@gmail.com',
                password: 'abc'
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("El email ingresado ya se encuentra en uso");
                done();

            })
    })
    it('No debe actualizar al usuario - Email inválido', (done) => {
        chai.request(url)
            .put('/update-user/62f5b2a528ef4dc5a4fcb8e8')
            .set({ 'Authorization': token })
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
    it('No debe actualizar al usuario - Campos faltantes', (done) => {
        chai.request(url)
            .put('/update-user/62f5b2a528ef4dc5a4fcb8e8')
            .set({ 'Authorization': token })
            .send({
                name: '',
                surname: 'Dominguez',
                email: "abc@gmail.com",


            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("Por favor ingrese los campos obligatorios (*) faltantes")
                done();

            })

    })





})