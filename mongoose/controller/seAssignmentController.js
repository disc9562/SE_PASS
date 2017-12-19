let mongoose = require('mongoose'),
seAssignment = mongoose.model('SeAssignment')
let moment = require('moment-timezone')
exports.addAssignment= function(req,res) 
{
  let deadline = moment(req.body.deadline).set({'hour':0,'minute':0,'second':0})
  let document = {
    'assignmentname' : req.body.assignmentname,
    'courseid' : req.body.courseid,
    'deadline' : deadline ,
    'assignmentdescription' : req.body.assignmentdescription
  }
  seAssignment.insertMany(document)
    .then((result)=>{
      res.send(result)
    }).catch((err)=>{
      res.json({ error: err })
    })

}

exports.getAssignmentByCourse = function(req, res){
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
    console.log(result)
    if(result.length % 10 === 0 && result.length !== 0){
      last_page = result.length / 10
    }
    else{
        last_page = Math.round(result.length / 10) + 1
    }                               
    if(current_page > 1){
        prev_page_url = domain + '?courseid=' + courseid + '&sort=&page=' + (current_page - 1) + '&per_page=' + per_page
    }             
    vuetableFormat.total = result.length
    vuetableFormat.per_page = per_page
    vuetableFormat.current_page = current_page
    vuetableFormat.last_page = last_page
    vuetableFormat.next_page_url = domain + '?courseid=' + courseid + '&sort=&page=' + (current_page + 1) + '&per_page=' + per_page
    vuetableFormat.prev_page_url = prev_page_url
    vuetableFormat.from = 1 + 10 * (current_page - 1)
    vuetableFormat.to = 10 * current_page
    vuetableFormat.data = result.slice(vuetableFormat.from - 1 , vuetableFormat.to)
    res.json(vuetableFormat)
  }).catch((err)=>{
    res.json({'error':err})
  })
}