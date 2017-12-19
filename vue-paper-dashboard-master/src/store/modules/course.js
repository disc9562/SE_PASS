const state = {
  url: 'http://localhost:9090/api/getAssignmentByCourse?courseid=',
  courseId: undefined
}

const mutations = {
  ENTERCOURSE (state, courseId) {
    state.url = state.url + courseId
    state.courseId = courseId
  },
  LEAVECOURSE (state) {
    state.url = 'http://localhost:9090/api/getAssignmentByCourse?courseid='
    state.courseId = undefined
  }
}

const actions = {
  actionEnterCourse ({ commit }, courseId) {
    commit('ENTERCOURSE', courseId)
  },
  actionLeaveCourse ({ commit }) {
    commit('LEAVECOURSE')
  }
}

const getters = {
  getCourseUrl: state => state.url,
  getCourseId: state => state.courseId
}

export default {
  state,
  mutations,
  actions,
  getters
}
