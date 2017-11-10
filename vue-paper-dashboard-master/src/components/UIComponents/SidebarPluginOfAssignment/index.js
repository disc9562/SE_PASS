import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: true,
  sidebarLinksOfAssignment: [
    {
      name: '作業區',
      icon: 'ti-view-list-alt',
      path: '/Course/assignment'
    },
    {
      name: '查詢成績',
      icon: 'ti-text',
      path: '/Course/grade'
    },
    {
      name: '作業批改',
      icon: 'ti-pencil-alt2',
      path: '/Course/correctAssignment'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPluginOfAssignment = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebarofassignment', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar-of-assignment', Sidebar)
  }
}

export default SidebarPluginOfAssignment
