const mongoose = require('mongoose')
let Schema = mongoose.Schema
let seCourseInfoSchema = new Schema({
    // coursename:{
    //     type: String,
    //     required: true,
    // },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    student:{
        type : Array
    }
})
module.exports = mongoose.model('SeCourseInfo', seCourseInfoSchema)