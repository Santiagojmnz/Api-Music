const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkYTEwNjY0NTNkYzlkYzNkZDkzM2E0MWVhNTdkYTNlZjI0MmIwZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjA0MTUxMzAsImF1ZCI6Ijc3MjQzNDUxNjQ0LXNtODZudnIyNXEzbzUxZWlqbTNvNW00OGEwcjcyZmVkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE4MjgxNjc5MzkxMzcxMTMwOTEwIiwiZW1haWwiOiJjYXJyYWxjYXJhcmFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6Ijc3MjQzNDUxNjQ0LXNtODZudnIyNXEzbzUxZWlqbTNvNW00OGEwcjcyZmVkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkNhcmxvcyBBbGZyZWRvIFJhbW9zIFJhbWlyZXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUl0YnZtbXFGd0F2TUtfNWMyWHVoanRrWnhjU1RnNFhGSWh6MzI4YUdER0o9czk2LWMiLCJnaXZlbl9uYW1lIjoiQ2FybG9zIEFsZnJlZG8iLCJmYW1pbHlfbmFtZSI6IlJhbW9zIFJhbWlyZXoiLCJpYXQiOjE2NjA0MTU0MzAsImV4cCI6MTY2MDQxOTAzMCwianRpIjoiOGUyNDYzNGNhMGU5Y2E3YzhiYTMwZTI5MmNmMjRlYWY1OGI3NTEyZSJ9.3MLvbNfYem2Lxbt2JI_JQcZRrjc6bBhSdvQ4xHUuLSQvUxtA5wcQn5KjDYiZlK481Wgp7EDOn7bpD3VMNhHneaGa7IvaqmwDIj07gze1zBxKPA8SKKIbDjpeCw4_kC_jW1nyTmeZ-8In3g7sHNtiPELJA5ElLn5vAlQ2P1lpYF66vHJl0Pnaw5t6GhBPJnTOi6LP9gmVLbSd6nSDos7aakpYGQWBUabG6MBPdP993aVPq_VanCHFRCrYyG89QD06NkFyV00CL71dQyBblk00Ri32DDYXwDWSMBCgwiHrEUoqNmVd3rzejLsbkKiRoD7K_DOLY--o9xpD0XKGv7Pc6g";
const url = 'http://localhost:8000';
describe('Login con Google', () => {
    it('Login Con Google - Login exitoso', (done) => {
        chai.request(url)
            .post('/api/google')
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
            .post('/api/google')
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