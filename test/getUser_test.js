const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require('dotenv').config();
const url = process.env.URL;
const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmNWUwN2ZiYWE4YmEwNDc3N2E3MjE5IiwiaWF0IjoxNjYwMjgxMDEyLCJleHAiOjE2NjI4NzMwMTJ9.f6g5xzGlBgWLPJmGSIvXL-NqOpD3R-ezCuLsfX_xDUw';
const tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
const tokenExpire = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgyMTY4LCJleHAiOjE2NjAyODIxNjh9.LgmUtjEkkcYTHmPd9hGqF7VKQzpuFPr4zUxpabCRqM0';
describe('Mostrar usuarios', () => {
    it('Debe mostrar los usuarios', (done) => {
        chai.request(url)
            .get('/user')
            .set({ 'Authorization': tokenAdmin })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('users');
                done();

            })
    })
    it('No debe mostrar usuarios  - Token no válido', (done) => {
        chai.request(url)
            .get('/user')
            .set({ 'Authorization': tokenAdmin + "asa" })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token no válido");
                done();

            })
    })
    it('No debe mostrar usuarios  - Token expirado', (done) => {
        chai.request(url)
            .get('/user')
            .set({ 'Authorization': tokenExpire })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token expirado");
                done();

            })
    })
    it('No debe mostrar usuarios  - Sin permisos suficientes rol: user', (done) => {
        chai.request(url)
            .get('/user')
            .set({ 'Authorization': tokenUser })
            .end((error, response) => {
                expect(response).to.have.status(403);
                expect(response.body).to.have.property('message');
                done();

            })
    })
    it('No debe mostrar usuarios  - Sin cabecera de autenticación', (done) => {
        chai.request(url)
            .get('/user')
            .set({})
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                done();

            })
    })

})