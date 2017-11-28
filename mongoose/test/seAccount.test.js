var chai = require('chai')
, chaiHttp = require('chai-http');
var expect = require('chai').expect;
var mongooseMock = require('mongoose-mock')
var sinon = require('sinon')
var sinonChai = require("sinon-chai");
var mongoose = require('mongoose');
require('sinon');
require('sinon-mongoose');
require('../models/se_account')
var seAccountController = require('../controller/seAccountController')
var app = require('../index')
chai.use(sinonChai)
chai.use(chaiHttp);

describe('Testing API with a mocked backend ',function(){
  it('returns a successful mocked response', function(done){
    var seAccount = mongoose.model('SeAccount')
    var seAccountMock = sinon.mock(seAccount)

    seAccountMock.expects('find')
    .withArgs({'role':'teacher'})
    .resolves([])
    chai.request(app)
    .get('/api/getAccountListByRole')
    .query({'role':'teacher', 'sort':null, 'page':1, 'per_page':10})
    .end(function(err, res){
        seAccountMock.verify();
        seAccountMock.restore();
        expect(res.status).to.equal(200);
        expect(res.body.total).to.equal(0);
        expect(res.body.per_page).to.equal('10');
        expect(res.body.current_page).to.equal(1);
        expect(res.body.last_page).to.equal(1);
        expect(res.body.next_page_url).to.equal('http://localhost:9000/api/getAccountListByRole?role=teacher&sort=&page=2&per_page=10');
        expect(res.body.prev_page_url).to.equal(null);
        expect(res.body.from).to.equal(1);
        expect(res.body.to).to.equal(10);
        expect(res.body.data).have.length(0);
        done()
    })
  })
})

describe('Testing API with a mocked backend /POST /api/signupSE', function(){
  it('should insert success', function(done){
    var seAccount = mongoose.model('SeAccount')
    var seAccountMock = sinon.mock(seAccount)

    seAccountMock.expects('insertMany')
    .withArgs({
      'username' : 'jay',
      'password' : '12345678',
      'email' : 'disc9562@gmail.com',
      'id' :'1055984794',
      'role' : 'student',
      'TA' : 'No'
    }).resolves(
      [
        {
        "__v": 0,
        "username": "disc9562",
        "password": "12345678",
        "email": "disc9562@gmail.com",
        "id": "1055984794",
        "_id": "5a1d54630689590ba4b044e2",
        "timeCreated": "2017-11-28T12:19:47.983Z",
        "TA": "No",
        "role": [
            "student"
          ]
        }
      ]
    )
  chai.request(app)
  .post('/api/signupSE')
  .send({
      'username' : 'jay',
      'password' : '12345678',
      'email' : 'disc9562@gmail.com',
      'id' :'1055984794',
      'role' : 'student',
      'TA' : 'No'
  }).end(function(err, res){
    seAccountMock.verify();
    seAccountMock.restore();
    expect(res.status).to.equal(200);
    expect(res.body[0].username).to.equal('disc9562');
    expect(res.body[0].email).to.equal('disc9562@gmail.com');
    expect(res.body[0].id).to.equal('1055984794');
    expect(res.body[0].TA).to.equal('No');
    expect(res.body[0].role[0]).to.equal('student');
    done()
    })
  })
})