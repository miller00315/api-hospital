/**
 *Arquivo para test da API
 */
var should = require("should");
var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var urlBase = "localhost:3000/api";

chai.use(chaiHttp);

describe("Teste API Hospital", function(){

  beforeEach(function(done){
    console.log('Iniciando testes');
    done();
  });

  it("Deve fazer o login", function(done){

    const profissional = {
       "profissional": {
         "email": "carlos@gmail.com",
         "password": "qwerty"
      }
    };

    chai
      .request(urlBase)//api url base
      .post('/profissionais/login')//rota
      .send(profissional)//objeto caso necessário
      .end(function(error, res){

      expect(res.status).to.equal(200);
      
      if(res.body.should.have.property('professional')) {
        res.body.professional.should.have.property('token');
      };

      done();
    });
  });
})