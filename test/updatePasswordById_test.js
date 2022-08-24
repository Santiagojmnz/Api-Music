const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const dotenv = require('dotenv').config();
const url = process.env.URL;
const tokenInvalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJmNWUwN2ZiYWE4YmEwNDc3N2E3MjE5IiwiaWF0IjoxNjYwMjgxMDEyLCJleHAiOjE2NjI4NzMwMTJ9.f6g5xzGlBgWLPJmGSIvXL-NqOpD3R-ezCuLsfX_xDUws';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgxOTI3LCJleHAiOjE2NjI4NzM5Mjd9.BsnFN462-fj3YG1dTTHOWwzpW-xACjDAVDRnwc4XLGs';
const tokenExpire = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjJlNzEzNTc0MmZmZDk1YjlhNjFjNTU4IiwiaWF0IjoxNjYwMjgyMTY4LCJleHAiOjE2NjAyODIxNjh9.LgmUtjEkkcYTHmPd9hGqF7VKQzpuFPr4zUxpabCRqM0';

describe('Actualizar password por id', () => {
    it('Debe permitir actualizar password', (done) => {
        chai.request(url)
            .post('/update-password/62f7b8625143ba94556db039')
            .set({ 'Authorization': token })
            .send({
                password: "asde456",
                newPassword: "asde456",
                confirmPassword: "asde456"
            })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('message').to.equal('Contraseña actualizada');
                done();

            })
    })
    it('No debe permitir actualizar password - Contraseña actual incorrecta', (done) => {
        chai.request(url)
            .post('/update-password/62f7b8625143ba94556db039')
            .set({ 'Authorization': token })
            .send({
                password: "kjasklajkls",
                newPassword: "asde456",
                confirmPassword: "asde456"
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal('Error al actualizar la contraseña, Contraseña actual incorrecta');
                done();

            })
    })
    it('No debe permitir actualizar password - Confirmacion de contraseña incorrecta', (done) => {
        chai.request(url)
            .post('/update-password/62f7b8625143ba94556db039')
            .set({ 'Authorization': token })
            .send({
                password: "asde456",
                newPassword: "asde456kljl",
                confirmPassword: "asde456"
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal('La confirmación de contraseña no coincide');
                done();

            })
    })
    it('No debe permitir actualizar password - Campos faltantes', (done) => {
        chai.request(url)
            .post('/update-password/62f7b8625143ba94556db039')
            .set({ 'Authorization': token })
            .send({
                password: "",
                newPassword: "",
                confirmPassword: ""
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal('Por favor ingrese los campos obligatorios (*) faltantes');
                done();

            })
    })
    it('No debe permitir actualizar password - El usuario no existe', (done) => {
        chai.request(url)
            .post('/update-password/62f6977618f15f6c5c9a154b')
            .set({ 'Authorization': token })
            .send({
                password: "asde456",
                newPassword: "asde456",
                confirmPassword: "asde456"
            })
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message').to.equal('El usuario no existe');
                done();

            })
    })
    it('No debe permitir actualizar password - MonngoId inválido', (done) => {
        chai.request(url)
            .post('/update-password/62f6977618f15f6c5c9a154b0')
            .set({ 'Authorization': token })
            .send({
                password: "kjasklajkls",
                newpassword: "asde456",
                confirmpassword: "asde456"
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal("MonngoId inválido");
                done();

            })
    })
    it('No debe permitir actualizar password  - Token no válido', (done) => {
        chai.request(url)
            .post('/update-password/62f6977618f15f6c5c9a154a')
            .set({ 'Authorization': tokenInvalid })
            .send({
                password: "kjasklajkls",
                newpassword: "asde456",
                confirmpassword: "asde456"
            })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token no válido");
                done();

            })
    })
    it('No debe permitir actualizar password  - Token expirado', (done) => {
        chai.request(url)
            .post('/update-password/62f6977618f15f6c5c9a154a')
            .set({ 'Authorization': tokenExpire })
            .send({
                password: "kjasklajkls",
                newpassword: "asde456",
                confirmpassword: "asde456"
            })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Token expirado");
                done();

            })
    })
    it('No debe permitir actualizar password  - Sin cabecera de autenticación', (done) => {
        chai.request(url)
            .post('/update-password/62f6977618f15f6c5c9a154a')
            .set({})
            .send({
                password: "kjasklajkls",
                newPassword: "asde456",
                confirmPassword: "asde456"
            })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("La petición no tiene la cabecera de autenticación");
                done();

            })
    })



})