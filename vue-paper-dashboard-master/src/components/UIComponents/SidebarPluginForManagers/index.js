import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    // {
    //   name: 'Dashboard',
    //   icon: 'ti-panel',
    //   path: '/admin/overview'
    // },
    // {
    //   name: 'User Profile',
    //   icon: 'ti-user',
    //   path: '/admin/stats'
    // },
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

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebarformanager', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar-for-manager', Sidebar)
  }
}

export default SidebarPlugin
