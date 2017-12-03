
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
require('../models/se_account')
var seCourseInfoController = require('../controller/seCourseInfoController')
var app = require('../index')
chai.use(sinonChai)
chai.use(chaiHttp)

describe.only('There is no data in courseInfo collection', function(){
    it('add student into the course', function(done){
        var seCourseInfo = mongoose.model('SeCourseInfo')
        var seCourseInfoMock = sinon.mock(seCourseInfo)
        var seAccount = mongoose.model('SeAccount')
        var SeAccountMock = sinon.mock(seAccount)
        SeAccountMock.expects('find')
        .withArgs({'id':'105598017'})
        .resolves([{
            "_id": "5a19259f9b399e03a04521aa",
            "__v": 0,
            "username": "hk01",
            "password": "1234",
            "email": "hk01@gmail.com",
            "id": "105598017",
            "timeCreated": "2017-11-25T08:11:11.060Z",
            "TA": "No",
            "role": [
                "student"
            ]
    }
])

        seCourseInfoMock.expects('find')
        .withArgs({'courseId':'5a1eaad63fa9c62328b3562d'})
        .resolves([])

        seCourseInfoMock.expects('insertMany')
        .withArgs({'students':{
            "_id": "5a19259f9b399e03a04521aa",
            "__v": 0,
            "username": "hk01",
            "password": "1234",
            "email": "hk01@gmail.com",
            "id": "105598017",
            "timeCreated": "2017-11-25T08:11:11.060Z",
            "TA": "No",
            "role": [
                "student"
            ]
        }, 'courseId':'5a1eaad63fa9c62328b3562d'})
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
        .post('/api/addStudentIntoCourse')
        .send({
            'studentId':'105598017',
            'courseId':'5a1eaad63fa9c62328b3562d'
        }).end(function(err, res){
            SeAccountMock.verify()
            SeAccountMock.restore()            
            seCourseInfoMock.verify()
            seCourseInfoMock.restore()
            expect(res.status).to.equal(200);
            expect(res.body[0].courseId).to.equal('5a1eaad63fa9c62328b3562d');
            expect(res.body[0].students[0].username).to.equal('disc9562')
            expect(res.body[0].students[0].id).to.equal('105598017')
            
            done()
        })
    })
})