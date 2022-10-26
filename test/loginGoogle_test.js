const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MjdiNmI0OTQwMmI5Y2Y5NWJlNGU4ZmQzOGFhN2U3YzExNjQ0YjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjEzMDgxMDUsImF1ZCI6Ijc3MjQzNDUxNjQ0LXNtODZudnIyNXEzbzUxZWlqbTNvNW00OGEwcjcyZmVkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNDE0MDY1NjcyOTI5MDE3OTE2IiwiZW1haWwiOiJwYXVsaW5hZ2FyY2lham92QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI3NzI0MzQ1MTY0NC1zbTg2bnZyMjVxM281MWVpam0zbzVtNDhhMHI3MmZlZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJwYXVsaW5hIG9jYW1wbyBnYXJjaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUl0YnZtbFVKWXM2Rm9hMldZVlBPNkRBQzRuZlQ2LWg5S0lSeGt4ckxvV0Y9czk2LWMiLCJnaXZlbl9uYW1lIjoicGF1bGluYSIsImZhbWlseV9uYW1lIjoib2NhbXBvIGdhcmNpYSIsImlhdCI6MTY2MTMwODQwNSwiZXhwIjoxNjYxMzEyMDA1LCJqdGkiOiI0YjJhNmY5M2E3NDczMmY5NmQ2OThhNzMyMTFmYzc5OGJlZGUxZjIwIn0.OVATaexB9X65PpCfW0jNOS9CinneXAfOJ5EOJZPEyiODQoG13osUeqpXgfx3BkDO50IOelzOeG0KgGE4Wj4MfIsIX916zlhEZcsURs6uHcMLk8FTgaT1etWVzCjC-IJiAL2LNEsjsih8A-B-JRgBQD2bM2twZt-mbM_NksmwwoDtr5Ew5FhCysv-oOpUlOHCdccMRf8SXLq57lpubCgRrlfmtSi5D6eFByGtwKnuqDHslIYhlFHnGPl-lhL9HxNdSj6BLN4PHZLypD5dKkxxRBZ2asBjaB2akdZxijmyo_4fusmpIQssNz3Hhr-TaSTqCw6_Dh40xNni4MCMHAyIXQ"
const dotenv = require('dotenv').config();
const url = process.env.URL;
describe('Login con Google', () => {
    it('Login Con Google - Login exitoso', (done) => {
        chai.request(url)
            .post('/google')
            .send({
                id_token: token
            })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('token')
                expect(response.body).to.have.property('user')
                done();

            })

    })
    it('Login con Google - Token invalido ', (done) => {
        chai.request(url)
            .post('/google')
            .send({
                id_token: "as" + token
            })
            .end((error, response) => {
                expect(response).to.have.status(400);
                expect(response.body).to.have.property('message').to.equal('Autentiación fallida, token invalido')
                done();

            })

    })





})