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
      enum: ['teacher','student','admin','TA']
    }],
    default:['student']
  },
  timeCreated: {
    type: Date,
    default: Date.now
  } 
})
module.exports = mongoose.model('SeAccount', seAccountSchema)