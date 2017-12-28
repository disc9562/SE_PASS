const mongoose = require('mongoose')
let Schema = mongoose.Schema
let seCourseInfoSchema = new Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    students:{
        type : Array
    }
})
module.exports = mongoose.model('SeCourseInfo', seCourseInfoSchema)