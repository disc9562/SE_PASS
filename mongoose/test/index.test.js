var chai = require('chai')
, chaiHttp = require('chai-http');
var nock = require('nock')
var expect = require('chai').expect;
var response = require('./response')
chai.use(chaiHttp);
describe("Testing API with a mocked backend", function () {
  
    it("returns a successful mocked response", function (done) {
      
      //specify the url to be intercepted
      nock("http://localhost:9000")
        //define the method to be intercepted
        .get('/api/getAccountListByRole')
        .query({role:'teacher',sort:null,page:1,per_page:10})
        //respond with a OK and the specified JSON response
        .reply(200, response);
      
      //perform the request to the api which will now be intercepted by nock
      chai.request('http://localhost:9000')
        .get('/api/getAccountListByRole')
        .query({role:'teacher',sort:null,page:1,per_page:10})
        .end(function (err, res) {
          //assert that the mocked response is returned
          expect(res.status).to.equal(200);
          expect(res.body.total).to.equal(200);
          expect(res.body.per_page).to.equal(10);
          expect(res.body.current_page).to.equal(1);
          expect(res.body.last_page).to.equal(20);
          expect(res.body.next_page_url).to.equal('http://140.124.181.149:9000/api/getAccountListByRole?role=teacher&sort=&page=2&per_page=10');
          expect(res.body.prev_page_url).to.equal(null);
          expect(res.body.from).to.equal(1);
          expect(res.body.to).to.equal(10);
          expect(res.body.data).have.length(3);
          done();
        });
    })
  });