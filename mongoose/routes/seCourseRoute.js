module.exports = function (app){
    let seCourse = require('../controller/seCourseController')

    app.route('/api/getCourseByTeacher')
    .get(seCourse.getCourseByTeacher)

    app.route('/api/getCourseByStudent')
    .get(seCourse.getCourseByStudent)

    app.route('/api/addCourseSE')
    .post(seCourse.create)
    
    app.route('/api/getAllCourse')
    .get(seCourse.getAllCourse)

    app.route('/api/deleteCourse')
    .post(seCourse.deleteCourse)
}