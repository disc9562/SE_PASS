const mongoose = require('mongoose')
let Schema = mongoose.Schema
let seAssignmentSchema = new Schema({
  assignmentname: {
    type: String,
    required: true,
    unique: true
  },
  coursename: {
    type: String
  },
  TA: {
    type: Array
  },
  deadline: {
    type: String,
    required: true
  },
  submit: {
    type: Array,
    default: []
  },
  comment: {
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