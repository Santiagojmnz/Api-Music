const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);
const dotenv = require('dotenv').config();
const url = process.env.URL;
const tokenVerified = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvZGUiOiI4YWRjMWQxZjU4ODE0MjllZDA4ZjJhMzQ5IiwiZW1haWwiOiJqbW56QGdtYWlsLmNvbSJ9LCJpYXQiOjE2NjAzNDIwODcsImV4cCI6MTY2MjkzNDA4N30.d8piFw8LU0iAw_ACy4ieVryHpRZEI2NxSxo8d8gePy8';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvZGUiOiI2OGYyZTVhNDBjZjMwNmZjMjM3Yzg5YTRjIiwiZW1haWwiOiJqbW56MkBnbWFpbC5jb20ifSwiaWF0IjoxNjYwMzQyMzExLCJleHAiOjE2NjI5MzQzMTF9.M76xzZak06d-1PRMz14T_ShM-Kjm6yKgj6oypXJEWGQ'
describe('Verificar correo electrónico', () => {
    it('Debe verificar la cuenta del usuario', (done) => {
        chai.request(url)
            .get(`/verify-account/${token}`)
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();

            })
    })
    it('Cuenta verificada con anterioridad', (done) => {
        chai.request(url)
            .get(`/verify-account/${tokenVerified}`)
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message');
                done();

            })
    })
    it('Cuenta no verificada - token invalido', (done) => {
        chai.request(url)
            .get(`/verify-account/${token}90`)
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal('Token no válido')
                done();

            })
    })


})