import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetable from '../node_modules/vuetable-2/src/components/Vuetable'
import VueTablePagination from '../node_modules/vuetable-2/src/components/VueTablePagination'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

import SideBarOfCourse from './components/UIComponents/SidebarPluginOfCourse'
import SideBarOfAssignment from './components/UIComponents/SidebarPluginOfAssignment'
import SideBarOfStudent from './components/UIComponents/SidebarPluginOfStudent'
import SideBarOfAccount from './components/UIComponents/SidebarPluginOfAccount'

// router setup
import routes from './routes/routes'

// library imports
import store from './store'
import Chartist from 'chartist'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'
import VueUploadComponent from 'vue-upload-component'
import 'vue-chartjs'
// plugin setup
Vue.use(VueRouter)
Vue.component('vuetable', Vuetable)
Vue.component('vuetable-pagination', VueTablePagination)
Vue.component('file-upload', VueUploadComponent)

Vue.use(SideBar)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)

Vue.use(SideBarOfCourse)
Vue.use(SideBarOfStudent)
Vue.use(SideBarOfAccount)
Vue.use(SideBarOfAssignment)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  },
  comments: {
    VueTable: Vuetable,
    VueTablePagination: VueTablePagination,
    VueUploadComponent: VueUploadComponent
  }
})
