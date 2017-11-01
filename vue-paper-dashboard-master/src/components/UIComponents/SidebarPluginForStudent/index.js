import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: true,
  sidebarLinks4: [
    {
      name: '作業區',
      icon: 'ti-view-list-alt',
      path: '/homework/assignment'
    },
    {
      name: '查詢成績',
      icon: 'ti-text',
      path: '/homework/grade'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPluginForStudent = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebarforstudent', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar-for-student', Sidebar)
  }
}

export default SidebarPluginForStudent
