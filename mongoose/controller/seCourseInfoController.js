let mongoose = require('mongoose'),
    seCourseInfo = mongoose.model('SeCourseInfo'),
    seAccount = mongoose.model('SeAccount')
    seCourse = mongoose.model('SeCourse')
const async = require('async');

exports.addStudentIntoCourse = function(req, res){
    let courseId = req.body.courseId
    let studentId = req.body.studentId
    // let studentInfo
    // seAccount.find({id:studentId})
    // .then(result=>{return result})
    // .then()
    async.auto({
        findStudent: function(callback){
            seAccount.find({id:studentId})
            .then((result)=>{
                console.log(result)
                // studentInfo = result[0]
                callback(null, result[0])
            }).catch((err)=>{
                console.log('err')
                res.json({ error: err })
            })
        },
        updateCourseInfo:['findStudent', function(studentInfo, callback){
            seCourseInfo.find({'courseId':courseId})
            .then((result)=>{
                return result
            }).then((result)=>{
                if(result.length === 0){
                    let document = {
                        courseId: courseId,
                        students:studentInfo.findStudent
                    }
                    seCourseInfo.insertMany(document)
                    .then((result)=>{
					            console.log('new CourseInfo')
                        callback(null,result)
                    }).catch((err)=>{
                        res.json({ error: err })
                    })
                }
                else{
                    for(let student of result[0].students){
                        if(student.id === studentId)
                            res.json({ error: 'student is already in the course' })
                    }
                    result[0].students.push(studentInfo.findStudent)
                    seCourseInfo.update({'_id':result[0]._id},result[0])
                    .then((update)=>{
												console.log('update CourseInfo')
                        callback(null,update) 
                    }).catch((err)=>{
                        console.log('insert error')
                        res.json({ error: err })
                    })
                }
            }).catch((err)=>{
                res.json({ error: err })
            })
				}],
				coursePopulationOperation:['updateCourseInfo', function(update, callback){
					seCourse.update({'courseId': courseId}, {$inc: { 'pupulation': 1 }})
					.then((result)=>{
						res.send(update.updateCourseInfo)
					}).catch((err)=>{
						res.json({error:err})
					})
				}]
    })
}

exports.getStudentsList = function (req, res){
    let courseId = req.query.courseId
    console.log(courseId)
    let page = req.query.page
    let per_page = req.query.per_page
    let current_page = 1
    let last_page = 1
    let prev_page_url = null
    let domain = "http://localhost:9090/api"
    let vuetableFormat = {}
    if(page){
        current_page = page * 1
    }
    seCourseInfo.find({'courseId':courseId})
                .then((result)=>{
                    console.log(result)
                    if(result[0].students.length % 10 === 0 && result[0].students.length !== 0){
                        last_page = result[0].students.length / 10
                    }
                    else{
                        last_page = Math.round(result[0].students.length / 10) + 1
                    }
                    if(current_page > 1){
                        prev_page_url = domain + '/getStudentsList?courseId' + courseId + '&sort=&page=' + (current_page - 1) + '&per_page=' + per_page
                    }
                    vuetableFormat.total = result[0].students.length
                    vuetableFormat.per_page = per_page
                    vuetableFormat.current_page = current_page
                    vuetableFormat.last_page = last_page
                    vuetableFormat.next_page_url = domain + '/getStudentsList?courseId' + courseId + '&sort=&page=' + (current_page + 1) + '&per_page=' + per_page
                    vuetableFormat.prev_page_url = prev_page_url
                    vuetableFormat.from = 1 + 10 * (current_page - 1)
                    vuetableFormat.to = 10 * current_page
                    vuetableFormat.data = result[0].students.slice(vuetableFormat.from - 1 , vuetableFormat.to)
                    res.json(vuetableFormat)
                }).catch((err)=>{
                    res.json({error:err})
                })
}