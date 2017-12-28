let mongoose = require('mongoose'),
seAssignment = mongoose.model('SeAssignment')
seCourseInfo = mongoose.model('SeCourseInfo')

let moment = require('moment-timezone')
exports.addAssignment = function(req,res) 
{
  let document = {
    'assignmentname' : req.body.assignmentname,
    'courseid' : req.body.courseid,
    'deadline' : req.body.deadline ,
    'assignmentdescription' : req.body.assignmentdescription
  }
  seAssignment.insertMany(document)
    .then((result)=>{
      seCourseInfo.find({
        'courseId': req.body.courseid
      })
      .then((courseInfo)=>{
        let studentList = []
        courseInfo[0].students.forEach(student=>{
          studentList.push(student)
        })
        console.log(studentList)
        seAssignment.update(
          {'assignmentname':req.body.assignmentname,'courseid':req.body.courseid}
          ,{$set:{
            'studentdetail':studentList,
          }})
        .then((update)=>{
          console.log(update)
        })
      })
    })
    .then((result)=>{
      res.send(result)
    }).catch((err)=>{
      res.json({ error: err })
    })

}

exports.getAssignmentByCourse = function(req, res){
  console.log('page')  
  console.log(req.query.page)
  let page = req.query.page
  let per_page = req.query.per_page
  let courseid = req.query.courseid
  let current_page = 1
  let last_page = 1
  let prev_page_url = null
  let domain = "http://140.124.181.149:9090/api"
  let vuetableFormat = {}
  seAssignment.find({courseid:courseid})
  .then((result)=>{
    if(result.length % 10 === 0 && result.length !== 0){
      last_page = result.length / 10
    }
    else{
        last_page = Math.round(result.length / 10) + 1
    }                               
    if(current_page > 1){
        prev_page_url = domain + '?courseid=' + courseid + '&sort=&page=' + (current_page - 1) + '&per_page=' + per_page
    }             
    if(result.length / 10 >  0  && result.length % 10 > 0){
      vuetableFormat.next_page_url = domain + '?courseid=' + courseid + '&sort=&page=' + (current_page + 1) + '&per_page=' + per_page    
    }
    else{
      vuetableFormat.next_page_url = null
    }
    vuetableFormat.total = result.length
    vuetableFormat.per_page = per_page
    vuetableFormat.page = page    
    vuetableFormat.current_page = current_page
    vuetableFormat.last_page = last_page
    vuetableFormat.prev_page_url = prev_page_url
    vuetableFormat.from = 1 + 10 * (current_page - 1)
    vuetableFormat.to = 10 * current_page
    vuetableFormat.data = result.slice(vuetableFormat.from - 1 , vuetableFormat.to)
    res.json(vuetableFormat)
  }).catch((err)=>{
    res.json({'error':err})
  })
}

exports.getStudentListByAssignment = function(req, res){
  console.log(req.query)
  let page = req.query.page
  let per_page = req.query.per_page
  let assignmentName = req.query.assignmentName
  let courseId = req.query.courseId
  let current_page = 1
  let last_page = 1
  let prev_page_url = null
  let domain = "http://140.124.181.149:9090/api"
  let vuetableFormat = {}
  seAssignment.find({'assignmentname':assignmentName, 'courseid':courseId})
  .then((result)=>{

    if(result.length % 10 === 0 && result.length !== 0){
      last_page = result.length / 10
    }
    else{
        last_page = Math.round(result.length / 10) + 1
    }                               
    if(current_page > 1){
        prev_page_url = domain + '?assignmentname=' + assignmentName + '&sort=&page=' + (current_page - 1) + '&per_page=' + per_page
    }             
    vuetableFormat.total = result.length
    vuetableFormat.per_page = per_page
    vuetableFormat.current_page = current_page
    vuetableFormat.last_page = last_page
    vuetableFormat.next_page_url = domain + '?assignmentname=' + assignmentName + '&sort=&page=' + (current_page + 1) + '&per_page=' + per_page
    vuetableFormat.prev_page_url = prev_page_url
    vuetableFormat.from = 1 + 10 * (current_page - 1)
    vuetableFormat.to = 10 * current_page
    vuetableFormat.data = result[0].studentdetail.slice(vuetableFormat.from - 1 , vuetableFormat.to)
    res.json(vuetableFormat)
  }).catch((err)=>{
    res.json({'error':err})
  })
}

exports.updateAssignmentGrade = function(req,res){
  console.log(req.body)
  // seAssignment.find({assignmentname:req.body.assignmentName}).then(result=>{
  //   console.log(result[0].studentdetail[0].username)
  // }).catch(err=>{
  //   console.log(err)
  // })
  seAssignment.update(
    {'studentdetail.id': req.body.studentId,'courseid':req.body.courseId,'assignmentname':req.body.assignmentName}, {'$set': {
    'studentdetail.$.assignmentDiscript': req.body.description,
    'studentdetail.$.assignmentScore': req.body.score
}}).then((update)=>{
  console.log(update)
})
  // seAssignment.update(
  //   {'studentdetail.id':req.body.studentId}
  //   ,{$set:{
  //   'studentdetail.assignmentDiscript':req.body.description,
  //   'studentdetail.submitAssignment':'已繳交',
  //   'studentdetail.assignmentScore':req.body.score
  //   }}).then(result=>{
  //     console.log(result)
  //   }).catch(err=>{
  //     console.log(err)
  //   })
   
  // let document = {
  //   'assignmentname' : req.body.assignmentname,
  //   'courseid' : req.body.courseid,
  //   'deadline' : req.body.deadline ,
  //   'assignmentdescription' : req.body.assignmentdescription
  // }
  // seAssignment.insertMany(document)
  //   .then((result)=>{
  //     seCourseInfo.find({
  //       'courseId': req.body.courseid
  //     })
  //     .then((courseInfo)=>{
  //       seAssignment.update(
  //         {'assignmentname':req.body.assignmentname}
  //         ,{$set:{
  //         'studentdetail':courseInfo[0].students,
  //         }})
  //       .then((update)=>{
  //         console.log(update)
  //       })
  //     })
  //   })
  //   .then((result)=>{
  //     res.send(result)
  //   }).catch((err)=>{
  //     res.json({ error: err })
  //   })

}

exports.getAllStudentGradeByAssignmentId = function(req, res){
  let assignmentId = req.query.assignmentId
  seAssignment.findOne({_id: assignmentId}).then((result)=>{
    let grade = {
      '59':0,
      '69':0,
      '79':0,
      '89':0,
      '99':0,
      '100':0
    }
    console.log('****************')
    for(let student in result.studentdetail){
      let score
      if(student.assignmentScore !== '未繳交')
        score = student.assignmentScore * 1
      else
        continue
      if(score < 60)
        grade['59'] += 1
      else if (60 <= score && score <= 69){
        grade['69'] += 1
      }else if (70 <= score && score <= 79){
        grade['79'] += 1
      }else if (80 <= score && score <= 89){
        grade['89'] += 1
      }else if (90 <= score && score <= 99){
        grade['99'] += 1
      }else{
        grade['100'] += 1
      }
      res.json({'grade':grade})
    }
    console.log(result)
  }).catch((err)=>{
    res.json({error: err})
  })
}