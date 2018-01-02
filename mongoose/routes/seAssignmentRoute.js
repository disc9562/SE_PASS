module.exports = function (app){
  let seAssignment = require('../controller/seAssignmentController')

  app.route('/api/getAssignmentByCourse')
  .get(seAssignment.getAssignmentByCourse)

  app.route('/api/addAssignment')
  .post(seAssignment.addAssignment)

  app.route('/api/getStudentListByAssignment')
  .get(seAssignment.getStudentListByAssignment)
  
  app.route('/api/updateAssignmentGrade')
  .post(seAssignment.updateAssignmentGrade)
  
  app.route('/api/getAllStudentGradeByAssignmentId')
  .get(seAssignment.getAllStudentGradeByAssignmentId)

  app.route('/api/getAllAssignmentDetailByStudent')
  .get(seAssignment.getAllAssignmentDetailByStudent)

  app.route('/api/deleteAssignment')
  .post(seAssignment.deleteAssignment)
  
}