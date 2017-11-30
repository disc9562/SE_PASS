var chai = require('chai')
, chaiHttp = require('chai-http');
var expect = require('chai').expect;
var mongooseMock = require('mongoose-mock')
var sinon = require('sinon')
var sinonChai = require("sinon-chai");
var mongoose = require('mongoose');
require('sinon');
require('sinon-mongoose');
require('../models/se_courseInfo')
var seCourseInfoController = require('../controller/seCourseInfoController')
var app = require('../index')
chai.use(sinonChai)
chai.use(chaiHttp)

describe('There is no data in courseInfo collection', function(){
    it('add student into the course', function(done){
        var seCourseInfo = mongoose.model('SeCourseInfo')
        var seCourseInfoMock = sinon.mock(seCourseInfo)

        seCourseInfoMock.expects('find')
        .withArgs({'courseId':'5a1eaad63fa9c62328b3562d'})
        .resolves([])

        seCourseInfoMock.expects('insertMany')
        .withArgs({'studentId':'105598017', 'courseId':'5a1eaad63fa9c62328b3562d'})
        .resolves(
            [
                {
                    "__v": 0,
                    "courseId": "5a1eaad63fa9c62328b3562d",
                    "_id": "5a1ff5a1a0afaf45d499f15f",
                    "students": [
                        {
                            "_id": "5a1eabc5786e8b2ab496e5ed",
                            "__v": 0,
                            "username": "disc9562",
                            "password": "12345678",
                            "email": "disc121239562@gmail.com",
                            "id": "105598017",
                            "timeCreated": "2017-11-29T12:44:53.811Z",
                            "TA": "No",
                            "role": [
                                "admin"
                            ]
                        }
                    ]
                }
            ]
        )
        chai.request(app)
        .post('api/addStudentIntoCourse')
        .send({
            'studentId':'105598017',
            'courseId':'5a1eaad63fa9c62328b3562d'
        }).end(function(err, res){
            seCourseInfoMock.verify()
            seCourseInfoMock.restore()
            expect(res.status).to.equal(200);
            expect(res.body[0].courseId).to.equal('5a1eaad63fa9c62328b3562d');
        })
    })
})