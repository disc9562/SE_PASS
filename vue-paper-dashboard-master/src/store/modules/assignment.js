const state = {
  url: 'http://localhost:9090/api/getStudentListByAssignment?assignmentName=',
  assignmentName: undefined
}

const mutations = {
  ADDASIGNMENT (state, assignmentName) {
    state.assignmentName = assignmentName
    state.url = state.url + assignmentName
  },
  INITASSIGNMENTURL (state) {
    state.url = 'http://localhost:9090/api/getStudentListByAssignment?assignmentName='
    state.assignmentName = undefined
  }
}

const actions = {
  actionaddAssignment ({ commit }, assignmentName) {
    commit('ADDASIGNMENT', assignmentName)
  },
  initAssignmentUrl ({commit}) {
    commit('INITASSIGNMENTURL')
  }
}

const getters = {
  getAssignmentName: state => state.assignmentName,
  getAssignmentUrl: state => state.url
}

export default {
  state,
  mutations,
  actions,
  getters
}
