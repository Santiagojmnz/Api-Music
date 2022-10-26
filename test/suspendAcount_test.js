const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require('dotenv').config();
const url = process.env.URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
const tokenExpire = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgyMTY4LCJleHAiOjE2NjAyODIxNjh9.LgmUtjEkkcYTHmPd9hGqF7VKQzpuFPr4zUxpabCRqM0';

describe('Suspender cuenta', () => {
    it('Debe suspender la cuenta del usuario', (done) => {
        chai.request(url)
            .get('/suspend-account/62f7b8625143ba94556db039')
            .set({ 'Authorization': token })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message').to.equal('Su cuenta ha sido suspendida temporalmente, Inicie sesión para reactivarla');
                done();

            })
    })
    it('No debe suspender la cuenta del usuario - Cuenta no encontrada', (done) => {
        chai.request(url)
            .get('/suspend-account/62f6977618f15f6c5c9a154b')
            .set({ 'Authorization': token })
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message').to.equal('El usuario no existe');
                done();

            })
    })
    it('No debe suspender la cuenta del usuario - MonngoId inválido', (done) => {
        chai.request(url)
            .get('/suspend-account/62f6977618f15f6c5c9a154b0')
            .set({ 'Authorization': token })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("MonngoId inválido");
                done();

            })
    })
    it('No debe suspender la cuenta del usuario  - Token no válido', (done) => {
        chai.request(url)
            .get('/suspend-account/62f6977618f15f6c5c9a154a')
            .set({ 'Authorization': token + "klñ" })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token no válido");
                done();

            })
    })
    it('No debe suspender la cuenta del usuario  - Token expirado', (done) => {
        chai.request(url)
            .get('/suspend-account/62f6977618f15f6c5c9a154a')
            .set({ 'Authorization': tokenExpire })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token expirado");
                done();

            })
    })
    it('No debe suspender la cuenta del usuario  - Sin cabecera de autenticación', (done) => {
        chai.request(url)
            .get('/suspend-account/62f6977618f15f6c5c9a154a')
            .set({})
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                done();

            })
    })



})