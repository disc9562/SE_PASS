var chai = require('chai')
, chaiHttp = require('chai-http');
var expect = require('chai').expect;
var mongooseMock = require('mongoose-mock')
var sinon = require('sinon')
var sinonChai = require("sinon-chai");
var mongoose = require('mongoose');
require('sinon');
require('sinon-mongoose');
require('../models/se_course')
var seAccountController = require('../controller/seCourseController')
var app = require('../index')
chai.use(sinonChai)
chai.use(chaiHttp);

describe('Testing API with a mocked backend /POST /api/courseTeacher',function(){
    it('should return empty data', function(done){
        var seCourse = mongoose.model('SeCourse')
        var seCourseMock = sinon.mock(seCourse)

        seCourseMock.expects('find')
        .withArgs({'courseTeacher':'劉建宏'})
        .resolves([])
        
        chai.request(app)
        .get('/api/getCourseByTeacher')
        .query({'courseTeacher':'劉建宏', sort:null,page:1, per_page:10})
        .end(function(err, res){
            seCourseMock.verify()
            seCourseMock.restore()
            expect(res.status).to.equal(200);
            expect(res.body.total).to.equal(0);
            expect(res.body.current_page).to.equal(1);
            expect(res.body.last_page).to.equal(1);
            expect(res.body.next_page_url).to.equal('http://140.124.181.81:9090/api?courseTeacher=劉建宏&sort=&page=2&per_page=10');
            expect(res.body.prev_page_url).to.equal(null);
            expect(res.body.from).to.equal(1);
            expect(res.body.to).to.equal(10)
            expect(res.body.data).have.length(0);
            done()
        })
    })
})