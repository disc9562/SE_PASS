import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks2: [
    {
      name: 'Account List',
      icon: 'ti-text',
      path: '/account/AccountList'
    },
    {
      name: 'Sign Up',
      icon: 'ti-view-list-alt',
      path: '/account/signUp'
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

    Object.defineProperty(Vue.prototype, '$sidebarforadmin', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar-for-admin', Sidebar)
  }
}

export default SidebarPlugin
