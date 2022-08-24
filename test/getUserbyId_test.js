const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require('dotenv').config();
const url = process.env.URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
const tokenExpire = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgyMTY4LCJleHAiOjE2NjAyODIxNjh9.LgmUtjEkkcYTHmPd9hGqF7VKQzpuFPr4zUxpabCRqM0';

describe('Mostrar usuario por id', () => {
    it('Debe mostrar al usuario', (done) => {
        chai.request(url)
            .get('/user/62e7135742ffd95b9a61c558')
            .set({ 'Authorization': token })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('user');
                done();

            })
    })
    it('No debe mostrar el usuario - Usuario no existe', (done) => {
        chai.request(url)
            .get('/user/62e7135742ffd95b9a61c559')
            .set({ 'Authorization': token })
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message').to.equal("El usuario no existe");
                done();

            })
    })
    it('No debe mostrar el usuario - MonngoId inválido', (done) => {
        chai.request(url)
            .get('/user/62e7135742ffd95b9a61c5599h')
            .set({ 'Authorization': token })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("MonngoId inválido");
                done();

            })
    })
    it('No debe mostrar al usuario - Token expirado', (done) => {
        chai.request(url)
            .get('/user/62e7135742ffd95b9a61c558')
            .set({ 'Authorization': tokenExpire })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token expirado");
                done();

            })
    })
    it('No debe actualizar al usuario - Token inválido', (done) => {
        chai.request(url)
            .get('/user/62e7135742ffd95b9a61c558')
            .set({ 'Authorization': token + "sasas" })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token no válido");
                done();

            })
    })


})