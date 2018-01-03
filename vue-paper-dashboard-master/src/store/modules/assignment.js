const state = {
  url: 'http://140.124.181.81:9090/api/getStudentListByAssignment?assignmentName=',
  assignmentName: undefined,
  courseId: undefined,
  assigntmentId: undefined
}

const mutations = {
  ADDASIGNMENT (state, data) {
    console.log(data)
    state.assignmentName = data.assignmentname
    state.url = state.url + data.assignmentname + '&courseId=' + data.courseid
  },
  INITASSIGNMENTURL (state) {
    state.url = 'http://140.124.181.81:9090/api/getStudentListByAssignment?assignmentName='
    state.assignmentName = undefined
    state.courseId = undefined
  },
  ADDASSIGNMENTID (state, assigntmentId) {
    state.assigntmentId = assigntmentId
  }
}

const actions = {
  actionaddAssignment ({ commit }, data) {
    commit('ADDASIGNMENT', data)
  },
  initAssignmentUrl ({commit}) {
    commit('INITASSIGNMENTURL')
  },
  actionAddAssignmentId ({commit}, assignmentId) {
    commit('ADDASSIGNMENTID', assignmentId)
  }
}

const getters = {
  getAssignmentName: state => state.assignmentName,
  getAssignmentUrl: state => state.url,
  getAssignmentId: state => state.assigntmentId
}

export default {
  state,
  mutations,
  actions,
  getters
}
