const state = {
  url: 'http://localhost:9090/api/getStudentListByAssignment?assignmentName=',
  assignmentName: undefined,
  courseId: undefined
}

const mutations = {
  ADDASIGNMENT (state, data) {
    console.log(data)
    state.assignmentName = data.assignmentname
    state.url = state.url + data.assignmentname + '&courseId=' + data.courseid
  },
  INITASSIGNMENTURL (state) {
    state.url = 'http://localhost:9090/api/getStudentListByAssignment?assignmentName='
    state.assignmentName = undefined
    state.courseId = undefined
  }
}

const actions = {
  actionaddAssignment ({ commit }, data) {
    commit('ADDASIGNMENT', data)
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
