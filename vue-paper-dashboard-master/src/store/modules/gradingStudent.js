const state = {
  studentName: undefined,
  id: undefined
}

const mutations = {
  SELECTSTUDENT (state, student) {
    state.id = student.id
    state.studentName = student.username
  },
  UNSELECTSTUDENT (state) {
    state.studentName = undefined
    state.id = undefined
  }
}

const actions = {
  selectstudent ({ commit }, userName) {
    commit('SELECTSTUDENT', userName)
  },
  unselectstudent ({ commit }) {
    commit('UNSELECTSTUDENT')
  }
}

const getters = {
  getStudent: state => state.studentName,
  getStudentId: state => state.id

}

export default {
  state,
  mutations,
  actions,
  getters
}
