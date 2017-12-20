const state = {
  assignmentName: undefined
}

const mutations = {
  ADDASIGNMENT (state, assginmentName) {
    state.assignmentName = assginmentName
  }
}

const actions = {
  actionaddAssignment ({ commit }, assginmentname) {
    commit('ADDASIGNMENT', assginmentname)
  }
}

const getters = {
  getAssignmentName: state => state.assginmentName
}

export default {
  state,
  mutations,
  actions,
  getters
}
