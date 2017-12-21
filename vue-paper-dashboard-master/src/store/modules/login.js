const state = {
  userName: 'guest',
  isLogin: false,
  role: 'student',
  id: undefined,
  url: undefined,
  metaData: {}
}

const mutations = {
  LOGIN (state, data) {
    if (data.role[0] === 'teacher') {
      state.url = 'http://localhost:9090/api/getCourseByTeacher?courseTeacher=' + data.username
    } else if (data.role[0] === 'student') {
      state.url = 'http://localhost:9090/api/getCourseByStudent?studentId=' + data.id
    }
    state.isLogin = true
    state.role = data.role[0]
    state.id = data.id
    state.userName = data.username
  },
  LOGOUT (state) {
    state.isLogin = false
    state.userName = 'guest'
    state.role = undefined
    state.id = undefined
    state.url = undefined
  },
  SYNC (state, metaData) {
    state.metaData = metaData
  },
  UPDATE (state, operation) {
    if (operation.action === 'deleteClip') {
      state.metaData.clips.forEach(function (element, index) {
        if (element.video.id === operation.data) {
          state.metaData.clips.splice(index, 1)
        }
      })
    }
  }
}

const actions = {
  actionLogin ({ commit }, userName) {
    commit('LOGIN', userName)
  },
  actionLogout ({ commit }) {
    commit('LOGOUT')
  },
  actionSync ({commit}, metaData) {
    commit('SYNC', metaData)
  },
  actionUpdate ({commit}, operation) {
    commit('UPDATE', operation)
  }
}

const getters = {
  getUser: state => state.userName,
  getRole: state => state.role,
  getId: state => state.id,
  getMetaData: state => state.metaData,
  getUrl: state => state.url
}

export default {
  state,
  mutations,
  actions,
  getters
}
