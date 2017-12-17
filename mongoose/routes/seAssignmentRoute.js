module.exports = function (app){
  let seCourse = require('../controller/seCourseController')

  app.route('/api/getAssignmentByCourse')
  .get(seCourse.getCourseByTeacher)

  app.route('/api/addAssignment')
  .post(seCourse.create)
  
}