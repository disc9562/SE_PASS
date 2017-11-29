module.exports = function (app){
  let seCourseInfo = require('../controller/seCourseInfoController')

  app.route('/api/addStudentIntoCourse')
  .post(seCourseInfo.addStudentIntoCourse)
  
}