let mongoose = require('mongoose'),
    seCourseInfo = mongoose.model('SeCourseInfo'),
    seAccount = mongoose.model('SeAccount')
const async = require('async');

exports.addStudentIntoCourse = function(req, res){
    let courseId = req.query.courseId
    let studentId = req.query.studentId
    // let studentInfo
    async.auto({
        findStudent: function(callback){
            seAccount.find({id:studentId})
            .then((result)=>{
                // studentInfo = result[0]
                callback(null, result[0])
            }).catch((err)=>{
                res.json({ error: err })
            })
        },
        updateCourseInfo:['findStudent', function(studentInfo, callback){
            seCourseInfo.find({'courseId':courseId})
            .then((result)=>{
                if(result.length === 0){
                    let document = {
                        courseId: courseId,
                        students:studentInfo.findStudent
                    }
                    seCourseInfo.insertMany(document)
                    .then((result)=>{
                        console.log('new CourseInfo')
                        res.send(result)
                    }).catch((err)=>{
                        res.json({ error: err })
                    })
                }
                else{
                    for(let student of result[0].students){
                        if(student.id === studentId)
                            res.json({ error: 'he is already in the course' })
                    }
                    result[0].students.push(studentInfo.findStudent)
                    seCourseInfo.update({'_id':result[0]._id},result[0])
                    .then((update)=>{
                        console.log('update CourseInfo')
                        res.send(update)
                    }).catch((err)=>{
                        console.log('insert error')
                        res.json({ error: err })
                    })
                }
            }).catch((err)=>{
                res.json({ error: err })
            })
        }]
    })


}