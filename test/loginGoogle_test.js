const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3MjdiNmI0OTQwMmI5Y2Y5NWJlNGU4ZmQzOGFhN2U3YzExNjQ0YjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjA4ODY2NDQsImF1ZCI6Ijc3MjQzNDUxNjQ0LXNtODZudnIyNXEzbzUxZWlqbTNvNW00OGEwcjcyZmVkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNDE0MDY1NjcyOTI5MDE3OTE2IiwiZW1haWwiOiJwYXVsaW5hZ2FyY2lham92QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI3NzI0MzQ1MTY0NC1zbTg2bnZyMjVxM281MWVpam0zbzVtNDhhMHI3MmZlZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJwYXVsaW5hIG9jYW1wbyBnYXJjaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUl0YnZtbFVKWXM2Rm9hMldZVlBPNkRBQzRuZlQ2LWg5S0lSeGt4ckxvV0Y9czk2LWMiLCJnaXZlbl9uYW1lIjoicGF1bGluYSIsImZhbWlseV9uYW1lIjoib2NhbXBvIGdhcmNpYSIsImlhdCI6MTY2MDg4Njk0NCwiZXhwIjoxNjYwODkwNTQ0LCJqdGkiOiJiMmI5ZTYxNzQyNTYzMzRkYWE1NzFhOTQ0N2FhNzA3OGM0MzIzMThiIn0.SJnNbqjcJWVTwM1lS2b3D5Nhh-uIQqVSCyK8kkiPm6WOP_yCr0UBn2eCqYS5953OQnSIEAAIH6_IVQSzNO5M7BPTcIV_GJnmmmQ5enaNGWivcm-NNrZRrG-NjpvC05UwkZMCd8RaqkWjIBgcFWM7J40yT6LldeWeKY_kYqRyessSzBSdxIVFKhbjg-qMGtThVzqlrcgRPFcyXV9UIUQI-4T3U-5YNSjDktQ4gNN_230Yy9H0yoV0Rc6BLoDinXCXYjnL_1IQxdHN--mU9GexXYcoAK609Hg7uY9320ovHKNVcjQI19wmQjO3mAePgEWvm2ux8PT0jGAETXouLJlAtg"
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