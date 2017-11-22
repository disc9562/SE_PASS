const Config = require('../../../config');
const Hapi = require('hapi');
const HapiAuthBasic = require('hapi-auth-basic');
const Lab = require('lab');
const MakeMockModel = require('../fixtures/make-mock-model');
const Manifest = require('../../../manifest');
const Path = require('path');
const Proxyquire = require('proxyquire');
var Code = require('code');
var nock = require('nock');
var lab = exports.lab = Lab.script();

//BDD Stylings
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;
let request;
let server;
let stub;

var signupForSE = require('../../../server/api/signupForSE');

lab.before((done) => {
  
      stub = {
        SeAccount: MakeMockModel(),      
        };
  
      const proxy = {};
      proxy[Path.join(process.cwd(), './server/models/se-account')] = stub.SeAccount;
  
      const ModelsPlugin = {
          register: Proxyquire('hapi-mongo-models', proxy),
          options: Manifest.get('/registrations').filter((reg) => {
  
              if (reg.plugin &&
                  reg.plugin.register &&
                  reg.plugin.register === 'hapi-mongo-models') {
  
                  return true;
              }
  
              return false;
          })[0].plugin.options
      };
  
      const plugins = [signupForSE];
      server = new Hapi.Server();
      server.connection({ port: Config.get('/port/web') });
      server.register(plugins, (err) => {
  
          if (err) {
              return done(err);
          }
  
          server.initialize(done);
      });
  });
  
  
  lab.after((done) => {
  
      server.plugins['hapi-mongo-models'].MongoModels.disconnect();
  
      done();
  });

  lab.experiment('test mock api', (done)=>{

    lab.beforeEach((done) => {
          let api1 = nock('http://localhost:9000')
                      .get('/api/getAccountListByRole')
                      .query({role:'admin'})
                      .reply(200, {name:'jay'})

              request = {
                  method: 'GET',
                  url: '/api/getAccountListByRole',
                  query:{
                    role:'admin'
                  }
              };
      
              done();
          });
      
    lab.test('try it', (done)=>{
      server.inject(request , (response)=>{
          Code.expect(reponse.name).to.match('jay')

          done()
      })
    })
  })
  
