const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const url = 'http://localhost:8000';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
const tokenExpire = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgyMTY4LCJleHAiOjE2NjAyODIxNjh9.LgmUtjEkkcYTHmPd9hGqF7VKQzpuFPr4zUxpabCRqM0';

describe('Buscador', () => {
    it('Buscador - se encontraron resultados', (done) => {
        chai.request(url)
            .get('/api/search/da')
            .set({ 'Authorization': token })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('results');
                done();

            })
    })
    it('Buscador - query sin resultados', (done) => {
        chai.request(url)
            .get('/api/search/wrto')
            .set({ 'Authorization': token })
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message').to.equal('Sin resultados');
                expect(response.body).to.have.property('results');
                done();

            })
    })
    it('Buscador - Sin query', (done) => {
        chai.request(url)
            .get('/api/search')
            .set({ 'Authorization': token })
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message').to.equal("Sin resultados");
                expect(response.body).to.have.property('results');
                done();

            })
    })

    it('No permite la busqueda - Token expirado', (done) => {
        chai.request(url)
            .get('/api/search/da')
            .set({ 'Authorization': tokenExpire })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token expirado");
                done();

            })
    })
    it('No permite la busqueda - Token inválido', (done) => {
        chai.request(url)
            .get('/api/search/da')
            .set({ 'Authorization': token + "jk" })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token no válido");
                done();

            })
    })
    it('No permite la busqueda - Sin cabecera de autenticación', (done) => {
        chai.request(url)
            .get('/api/search/da').set({})

        .end((error, response) => {
            expect(response).to.have.status(401);
            expect(response.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
            done();

        })
    })



})