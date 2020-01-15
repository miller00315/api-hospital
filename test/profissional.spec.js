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

const parametros = [{
  param: 'nome',
  valor: 'a'
}, {
  param: 'sobrenome',
  valor: 'm'
}, {
  param: 'numeroProtocolo',
  valor: '0'
}];

describe("Teste API profissionais", function(){

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

  it("Deve retornar lista pacientes com token", function(done){
    chai
      .request(urlBase)
      .get('/pacientes')
      .set('Authorization', token)
      .end(function(error, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceOf(Array);
        expect(res.body).to.have.length.above(0);
        done();
      });
  })

  parametros.forEach(function(elemento, index){
    it(`Verificar o parametro ${elemento.param} com o valor ${elemento.valor}`, function(done){
      chai
        .request(urlBase)
        .get(`/pacientes/${elemento.param}/${elemento.valor}`)
        .set('Authorization', token)
        .end(function(error, res){
          if(expect(res.status).to.equal(200)){
            if(expect(res.body).to.be.instanceOf(Array)){
              expect(res.body).to.have.length.above(0);
            }  
          }
          done();
        });
    })
  });

  it('Verifica profissional por parametro', function(done){
    chai
      .request(urlBase)
      .get(`/profissionais/nome/c`)
      .set('Authorization', token)
      .end(function(error, res){
        if(expect(res.status).to.equal(200)){
          if(expect(res.body).to.be.instanceOf(Array)){
            expect(res.body).to.have.length.above(0);
          }  
        }
      });
      
    done();
  })

  it("Deve retornar 404 rota inválida com token", function(done){
    chai
      .request(urlBase)
      .post('/profissionais/qualquerCoisa')
      .set('Authorization', token)
      .end(function(error, res){
        expect(res.status).to.equal(404);
        done();
      });
  });

  it("Deve retornar 404 rota inválida sem token", function(done){
    chai
      .request(urlBase)
      .post('/profissionais/qualquerCoisa')
      .end(function(error, res){
        expect(res.status).to.equal(404);
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