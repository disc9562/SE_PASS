let mongoose = require('mongoose'),
seCourse = mongoose.model('SeCourse'),
seAccount = mongoose.model('SeAccount')
exports.create = function(req,res){
  let document = {
    'coursename' : req.body.coursename,
    'courseteacher' : req.body.courseteacher,
    'TA' : req.body.TA,
    'classtime' : req.body.classtime,
    'population' : req.body.population,
    'coursedescription' : req.body.coursedescription
  }
  seCourse.insertMany(document)
  .then((result)=>{
    res.send(result)
  }).catch((err)=>{
    res.json({ error: err })
  })
}
exports.getCourseByTeacher = function(req,res){
let page = req.query.page
let per_page = req.query.per_page
let courseTeacher = req.query.courseTeacher
let current_page = 1
let last_page = 1
let prev_page_url = null
let domain = "http://140.124.181.81:9090/api"
let vuetableFormat = {}
if(page){
current_page = page * 1
}
seCourse.find({'courseteacher':courseTeacher})
        .then((result)=>{
          if(result.length % 10 === 0 && result.length !== 0){
            last_page = result.length / 10
          }
          else{
              last_page = Math.round(result.length / 10) + 1
          }                               
          if(current_page > 1){
              prev_page_url = domain + '?page=' + (current_page - 1)
          }             
          vuetableFormat.total = result.length
          vuetableFormat.per_page = per_page
          vuetableFormat.current_page = current_page
          vuetableFormat.last_page = last_page
          vuetableFormat.next_page_url = domain + '?courseTeacher=' + courseTeacher + '&sort=&page=' + (current_page + 1) + '&per_page=' + per_page
          vuetableFormat.prev_page_url = prev_page_url
          vuetableFormat.from = 1 + 10 * (current_page - 1)
          vuetableFormat.to = 10 * current_page
          vuetableFormat.data = result.slice(vuetableFormat.from - 1 , vuetableFormat.to)
          res.json(vuetableFormat)
        }).catch((err)=>{
          res.json({ error: err })
        })
}

exports.getCourseByStudent = function(req,res){
  let page = req.query.page
  let per_page = req.query.per_page
  let id = req.query.studentId
  let current_page = 1
  let last_page = 1
  let prev_page_url = null
  let domain = "http://140.124.181.81:9090/api"
  let vuetableFormat = {}
  if(page){
  current_page = page * 1
  }
  seAccount.find({'id':id})
          .then((result)=>{
              seCourse.find({'_id':{"$in": result[0].course}})
              .then((result)=>{
                if(result.length % 10 === 0 && result.length !== 0){
                  last_page = result.length / 10
                }
                else{
                    last_page = Math.round(result.length / 10) + 1
                }                               
                if(current_page > 1){
                    prev_page_url = domain + '?page=' + (current_page - 1)
                }             
                vuetableFormat.total = result.length
                vuetableFormat.per_page = per_page
                vuetableFormat.current_page = current_page
                vuetableFormat.last_page = last_page
                vuetableFormat.next_page_url = domain + '?id =' + id + '&sort=&page=' + (current_page + 1) + '&per_page=' + per_page
                vuetableFormat.prev_page_url = prev_page_url
                vuetableFormat.from = 1 + 10 * (current_page - 1)
                vuetableFormat.to = 10 * current_page
                vuetableFormat.data = result.slice(vuetableFormat.from - 1 , vuetableFormat.to)
                res.json(vuetableFormat)
              }) 
          }).catch((err)=>{
            res.json({ error: err })
          })
  }

exports.getAllCourse = function(req,res){
  let courseTeacher = req.query.courseTeacher
  let page = req.query.page
  let per_page = req.query.per_page
  let current_page = 1
  let last_page = 1
  let prev_page_url = null
  let domain = "http://140.124.181.81:9090/api"
  let vuetableFormat = {}
  if(page){
  current_page = page * 1
  }
  seCourse.find()
          .then((result)=>{                       
            if(result.length % 10 === 0 && result.length !== 0){
              last_page = result.length / 10
            }
            else{
                last_page = Math.round(result.length / 10) + 1
            }                               
            if(current_page > 1){
                prev_page_url = domain + '?page=' + (current_page - 1)
            }             
            vuetableFormat.total = result.length
            vuetableFormat.per_page = per_page
            vuetableFormat.current_page = current_page
            vuetableFormat.last_page = last_page
            vuetableFormat.next_page_url = domain  + '&sort=&page=' + (current_page + 1) + '&per_page=' + per_page
            vuetableFormat.prev_page_url = prev_page_url
            vuetableFormat.from = 1 + 10 * (current_page - 1)
            vuetableFormat.to = 10 * current_page
            vuetableFormat.data = result.slice(vuetableFormat.from - 1 , vuetableFormat.to)
            res.json(vuetableFormat)

          }).catch((err)=>{
            res.json({ error: err })
          })
  }


exports.deleteCourse = function(req,res){
  seCourse.remove({coursename:req.body.coursename})
  .then((result)=>{
    res.send(result)
  }).catch((err)=>{
    res.json(err)
  })
}
