import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: true,
  sidebarLinksOfStudent: [
    {
      name: '作業區',
      icon: 'ti-view-list-alt',
      path: '/student/assignmentListForStudent'
    },
    {
      name: '查詢成績',
      icon: 'ti-text',
      path: '/student/searchGradeList'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPluginOfStudent = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebarofstudent', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar-of-student', Sidebar)
  }
}

export default SidebarPluginOfStudent
