const state = {
  url: 'http://localhost:9090/api/getAssignmentByCourseId?courseId='
}

const mutations = {
  ENTERCOURSE (state, id) {
    state.url = state.url + id
  },
  LEAVECOURSE (state) {
    state.url = 'http://localhost:9090/api/getAssignmentByCourseId?courseId='
  }
}

const actions = {
  actionEnterCourse ({ commit }, id) {
    commit('ENTERCOURSE', id)
  },
  actionLeaveCourse ({ commit }) {
    commit('LEAVECOURSE')
  }
}

const getters = {
  getCourseUrl: state => state.url
}

export default {
  state,
  mutations,
  actions,
  getters
}
