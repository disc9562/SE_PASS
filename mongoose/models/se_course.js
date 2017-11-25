const mongoose = require('mongoose')
let Schema = mongoose.Schema
let seCourseSchema = new Schema({
  coursename: {
    type: String,
    required: true,
    unique: true
  },
  courseteacher: {
    type: String
  },
  TA: {
    type: Array
  },
  classtime: {
    type: String,
    required: true
  },
  population: {
    type: String,
    required: true
  },
  coursedescription: {
    type: String
  },
  timeCreated: {
    type: Date,
    default: Date.now
  } 
})
module.exports = mongoose.model('SeCourse', seCourseSchema)