var should = require("should");
var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var urlBase = "localhost:3000/api";

chai.use(chaiHttp);

const profissional = {
  "profissional": {
    "email": "carlos@gmail.com",
    "password": "qwerty"
 }
};

describe('Teste api pacientes', function(){
  
  before(function(){
    console.log('Iniciando testes com pacientes');
  });

  it("Não deve retornar lista de pacientes sem token", function(done) {
    chai
      .request(urlBase)
      .get('/pacientes')
      .end(function(error, res) {
        expect(res.status).to.equal(401);
        done();
      })
  })
});