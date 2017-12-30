const state = {
  url: 'http://localhost:9090/api/getAssignmentByCourse?courseid=',
  courseId: undefined,
  courseName: undefined,
  studentAssignmentUrl: 'http://localhost:9090/api/getAllAssignmentDetailByStudent?courseid='
}

const mutations = {
  ENTERCOURSE (state, course) {
    state.url = state.url + course._id
    state.courseId = course._id
    state.courseName = course.coursename
    state.studentAssignmentUrl = state.studentAssignmentUrl + course._id
  },
  LEAVECOURSE (state) {
    state.url = 'http://localhost:9090/api/getAssignmentByCourse?courseid='
    state.courseId = undefined
    state.courseName = undefined
    state.studentAssignmentUrl = 'http://localhost:9090/api/getAllAssignmentDetailByStudent?courseid='
  }
}

const actions = {
  actionEnterCourse ({ commit }, course) {
    commit('ENTERCOURSE', course)
  },
  actionLeaveCourse ({ commit }) {
    commit('LEAVECOURSE')
  }
}

const getters = {
  getCourseUrl: state => state.url,
  getCourseId: state => state.courseId,
  getCourseName: state => state.courseName,
  getStudentAssignmentUrl: state => state.studentAssignmentUrl
}

export default {
  state,
  mutations,
  actions,
  getters
}
