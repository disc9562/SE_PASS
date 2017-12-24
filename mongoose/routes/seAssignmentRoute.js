module.exports = function (app){
  let seAssignment = require('../controller/seAssignmentController')

  app.route('/api/getAssignmentByCourse')
  .get(seAssignment.getAssignmentByCourse)

  app.route('/api/addAssignment')
  .post(seAssignment.addAssignment)

  app.route('/api/getStudentListByAssignment')
  .get(seAssignment.getStudentListByAssignment)
  
}