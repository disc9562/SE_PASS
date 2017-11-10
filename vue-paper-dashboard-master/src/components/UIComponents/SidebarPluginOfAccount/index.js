import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinksOfAccount: [
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

const SidebarPluginOfAccount = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebarofaccount', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar-for-account', Sidebar)
  }
}

export default SidebarPluginOfAccount
