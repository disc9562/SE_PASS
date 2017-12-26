const mongoose = require('mongoose')
let Schema = mongoose.Schema
let seAssignmentSchema = new Schema({
  assignmentname: {
    type: String,
    required: true
  },
  courseid: {
    type: String
  },
  deadline: {
    type: String,
    required: true
  },
  studentdetail: {
    type: Array,
    default: []
  },
  assignmentdescription: {
    type: String
  },
  timeCreated: {
    type: Date,
    default: Date.now
  } 
})
module.exports = mongoose.model('SeAssignment', seAssignmentSchema)