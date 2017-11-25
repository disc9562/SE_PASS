module.exports = function (app){
    let seCourse = require('../controller/seCourseController')

    app.route('/api/getCourseByTeacher')
    .get(seCourse.getCourseByTeacher)

    app.route('/api/addCourseSE')
    .post(seCourse.create)
}