import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinksOfCourse: [
    {
      name: 'Course',
      icon: 'ti-view-list-alt',
      path: '/app/Course'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPluginOfCourse = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebarofcourse', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar-of-course', Sidebar)
  }
}

export default SidebarPluginOfCourse
