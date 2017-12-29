const state = {
  url: 'http://localhost:9090/api/getAssignmentByCourse?courseid=',
  getStudentUrl: 'http://localhost:9090/api/getStudentsList?courseid=',
  courseId: undefined,
  courseName: undefined
}

const mutations = {
  ENTERCOURSE (state, course) {
    state.url = state.url + course._id
    state.getStudentUrl = state.getStudentUrl + course._id
    state.courseId = course._id
    state.courseName = course.coursename
  },
  LEAVECOURSE (state) {
    state.url = 'http://localhost:9090/api/getAssignmentByCourse?courseid='
    state.courseId = undefined
    state.courseName = undefined
    state.getStudentUrl = 'http://localhost:9090/api/getStudentsList?courseid='
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
  getStudentUrl: state => state.getStudentUrl
}

export default {
  state,
  mutations,
  actions,
  getters
}
