const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
chai.use(chaiHttp);

const url = 'http://localhost:8000';


describe('Autenticar usuario', () => {
    it('Debe autenticar al usuario', (done) => {
        chai.request(url)
            .post('/api/login')
            .send({
                email: "jmnzsantiago@gmail.com",
                password: 'asde456'

            })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('token');
                expect(response.body).to.have.property('user');
                done();

            })
    })
    it('No debe autenticar al usuario - El usuario no existe', (done) => {
        chai.request(url)
            .post('/api/login')
            .send({
                email: "jmnz00@gmail.com",
                password: 'jdksljdlsj'

            })
            .end((error, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.have.property('message').to.equal("No se encontró el correo electrónico en la base de datos");

                done();

            })
    })
    it('No debe autenticar al usuario - Cuenta no verificada', (done) => {
        chai.request(url)
            .post('/api/login')
            .send({
                email: "santiag1325@gmail.com",
                password: 'asde456'

            })
            .end((error, response) => {
                expect(response).to.have.status(403);
                expect(response.body).to.have.property('message').to.equal("Cuenta no verificada, accede a tu correo electrónico para verificar la cuenta");
                done();

            })
    })
    it('No debe autenticar al usuario - Usuario y/o contraseña incorrecta', (done) => {
        chai.request(url)
            .post('/api/login')
            .send({
                email: "jmnzsantiago@gmail.com",
                password: 'jdkljfkldsjfkls'

            })
            .end((error, response) => {
                expect(response).to.have.status(401);
                expect(response.body).to.have.property('message').to.equal("Usuario y/o contaseña incorrecta");
                done();

            })
    })
})