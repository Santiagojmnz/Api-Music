const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MjdiNmI0OTQwMmI5Y2Y5NWJlNGU4ZmQzOGFhN2U3YzExNjQ0YjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjEyOTk4NzQsImF1ZCI6Ijc3MjQzNDUxNjQ0LXNtODZudnIyNXEzbzUxZWlqbTNvNW00OGEwcjcyZmVkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNDE0MDY1NjcyOTI5MDE3OTE2IiwiZW1haWwiOiJwYXVsaW5hZ2FyY2lham92QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI3NzI0MzQ1MTY0NC1zbTg2bnZyMjVxM281MWVpam0zbzVtNDhhMHI3MmZlZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJwYXVsaW5hIG9jYW1wbyBnYXJjaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUl0YnZtbFVKWXM2Rm9hMldZVlBPNkRBQzRuZlQ2LWg5S0lSeGt4ckxvV0Y9czk2LWMiLCJnaXZlbl9uYW1lIjoicGF1bGluYSIsImZhbWlseV9uYW1lIjoib2NhbXBvIGdhcmNpYSIsImlhdCI6MTY2MTMwMDE3NCwiZXhwIjoxNjYxMzAzNzc0LCJqdGkiOiI0YmQxNGEyMjBmODI5YzhjNzViNjIxNDE2OGU0NDlhMDY4MzJmYzJkIn0.WTJR5J3bCIA6ea3UoUUxrZ6MoG_jIK_sn2uJnZc4EjHGGTAHNGvq851lxQhfgNvsp0CBdLUfeuDnFKCH5OjkffdiBpgvJF0wbJW81_wHwrN0yuDBXYJWI2UwHjTERyfWMkrr8pZVHrz10AhgQotPIuIQcsJNUb3kEJTZAWRQKWWO-ORmI-bGBRb277UcxGSMtiP1hT_RBTYMrfnaeu0uhiSy0Fy8XRz_rWnrA12dXt6lVRCFuyHE1Gx6RBcedf5g86P28hZ0HN8qnd-fxxqJIE6KQVgRQ1ibQJlvBo5O19uAIXZ84PaHOqzxmeTCAcMQMZyjmKOJzOD-n77_OLjy7w"
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