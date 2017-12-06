import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinksOfAccount: [
    {
      name: '課程列表',
      icon: 'ti-view-list-alt',
      path: '/account/allCourseList'
    },
    {
      name: '帳戶列表',
      icon: 'ti-view-list-alt',
      path: '/account/accountList'
    },
    {
      name: '新增課程',
      icon: 'glyphicon glyphicon-plus-sign',
      path: '/account/addCourse'
    },
    {
      name: '新增帳戶',
      icon: 'glyphicon glyphicon-plus-sign',
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
