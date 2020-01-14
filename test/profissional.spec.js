/**
 *Arquivo para test da API
 */
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

describe("Teste API Hospital", function(){

  let token;
  before(function(){
    console.log('Iniciando testes com profissionais');
  });

  it("Deve fazer o login", function(done){

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

  it("Não pode fazer logout sem token", function(done){
    chai
      .request(urlBase)
      .post('/profissionais/logout')
      .end(function(error, res){
        expect(res.status).to.equal(401);
        done();
      });
  });

  before(function() {
    chai
      .request(urlBase)//api url base
      .post('/profissionais/login')//rota
      .send(profissional)//objeto caso necessário
      .end(function(error, res){
        if(res.body.professional.token) {
          token = res.body.professional.token;
        }
      });
  });

  it("Deve retornar os profissionais", function(done){
    chai
      .request(urlBase)
      .get('/profissionais')
      .set('Authorization', token)
      .end(function(error, res){
        expect(res.body).to.be.instanceOf(Array);
        expect(res.body).to.have.length.above(0);
        done();
      });
  });

  it("Deve realizar logout com token", function(done){
    chai
      .request(urlBase)
      .post('/profissionais/logout')
      .set('Authorization', token)
      .end(function(error, res){
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("Não deve realizar logout com token inválido", function(done){
    chai
      .request(urlBase)
      .post('/profissionais/logout')
      .set('Authorization', token)
      .end(function(error, res){
        expect(res.status).to.equal(401);
        done();
      });
  });
})