const mongoose = require('mongoose')
const isEmail = require('validator').isEmail
let Schema = mongoose.Schema
let seAccountSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: [isEmail, 'invalid email'],
    required: true,
    unique: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: [{type: String,
      enum: ['teacher','student']
    }],
    default:['student']
  },
  TA: {
    type: String,
    default:'No'
  },
  timeCreated: {
    type: Date,
    default: Date.now
  },
  course:{
    type: Array,
    default: []
  },
  assignmentDiscript:{
    type:String,
    default:'未評論'
  },
  submitAssignment:{
    type:String,
    default:'未繳交'
  },
  assignmentScore:{
    type:String,
    default:'未評分'
  }

})
module.exports = mongoose.model('SeAccount', seAccountSchema)