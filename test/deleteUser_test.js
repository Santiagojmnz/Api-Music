const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);
const dotenv = require('dotenv').config();
const url = process.env.URL;
const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmNWUwN2ZiYWE4YmEwNDc3N2E3MjE5IiwiaWF0IjoxNjYwMjgxMDEyLCJleHAiOjE2NjI4NzMwMTJ9.f6g5xzGlBgWLPJmGSIvXL-NqOpD3R-ezCuLsfX_xDUw';
const tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
const tokenExpire = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgyMTY4LCJleHAiOjE2NjAyODIxNjh9.LgmUtjEkkcYTHmPd9hGqF7VKQzpuFPr4zUxpabCRqM0';

describe('Eliminar usuario', () => {
    it('Debe eliminar al usuario', (done) => {
        chai.request(url)
            .delete('/delete-user/62ff0f7b750145197a2d0d60')
            .set({ 'Authorization': tokenAdmin })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message').to.equal('Cuenta eliminada');
                done();

            })
    })
    it('No debe eliminar al usuario - Cuenta no encontrada', (done) => {
        chai.request(url)
            .delete('/delete-user/62f6977618f15f6c5c9a154b')
            .set({ 'Authorization': tokenAdmin })
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message').to.equal('Cuenta no encontrada');
                done();

            })
    })
    it('No debe eliminar al usuario - MonngoId inválido', (done) => {
        chai.request(url)
            .delete('/delete-user/62f6977618f15f6c5c9a154b0')
            .set({ 'Authorization': tokenAdmin })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("MonngoId inválido");
                done();

            })
    })
    it('No debe eliminar al usuario  - Token no válido', (done) => {
        chai.request(url)
            .delete('/delete-user/62f6977618f15f6c5c9a154a')
            .set({ 'Authorization': tokenAdmin + "jk" })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token no válido");
                done();

            })
    })
    it('No debe eliminar al usuario  - Token expirado', (done) => {
        chai.request(url)
            .delete('/delete-user/62f6977618f15f6c5c9a154a')
            .set({ 'Authorization': tokenExpire })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token expirado");
                done();

            })
    })
    it('No debe eliminar al usuario  - Sin permisos suficientes rol: user', (done) => {
        chai.request(url)
            .delete('/delete-user/62f6977618f15f6c5c9a154a')
            .set({ 'Authorization': tokenUser })
            .end((error, response) => {
                expect(response).to.have.status(403);
                expect(response.body).to.have.property('message');
                done();

            })
    })
    it('No debe eliminar al usuario  - Sin cabecera de autenticación', (done) => {
        chai.request(url)
            .delete('/delete-user/62f6977618f15f6c5c9a154a')
            .set({})
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                done();

            })
    })



})