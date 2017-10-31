import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import AssignmentList from 'src/components/Dashboard/Views/AssignmentList.vue'
import gradeList from 'src/components/Dashboard/Views/gradeList'
import Login from 'src/components/Login/Login.vue'
import DashboardLayoutForManager from '../components/Dashboard/Layout/DashboardLayoutForManager.vue'
import DashboardLayoutForStudent from '../components/Dashboard/Layout/DashboardLayoutForStudent'
import CorrectAssignmentList from 'src/components/Dashboard/Views/CorrectAssignmentList'
import AssignmentListForStudent from 'src/components/Dashboard/Views/AssignmentListForStudent'
import gradeListForStudent from 'src/components/Dashboard/Views/gradeListForStudent'
import AccountList from 'src/components/Dashboard/Views/AccountList'
import SignUp from 'src/components/Dashboard/Views/SignUp'
import DashboardLayoutForAdmin from '../components/Dashboard/Layout/DashboardLayoutForAdmin'
import Setting from 'src/components/Dashboard/Views/Setting'
import Correct from 'src/components/Dashboard/Views/Correct'
import Assignment from 'src/components/Dashboard/Views/Assignment'
import addCourse from 'src/components/Dashboard/Views/addCourse'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/stats',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'maps',
        component: Maps
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography
      },
      {
        path: 'Course',
        name: 'Course',
        component: TableList
      }
    ]
  },
  {
    path: '/Course',
    component: DashboardLayoutForManager,
    redirect: '/Course/assignment',
    children: [
      {
        path: 'assignment',
        name: 'assignment',
        component: AssignmentList
      },
      {
        path: 'grade',
        name: 'grade',
        component: gradeList
      },

      {
        path: 'correctAssignment',
        name: 'correctAssignment',
        component: CorrectAssignmentList
      },
      {
        path: 'correct',
        name: 'correct',
        component: Correct
      }
    ]
  },
  {
    path: '/homework',
    component: DashboardLayoutForStudent,
    redirect: '/homework/assignment',
    children: [
      {
        path: 'assignment',
        name: 'assignment',
        component: AssignmentListForStudent
      },
      {
        path: 'grade',
        name: 'grade',
        component: gradeListForStudent
      }
    ]
  },
  {
    path: '/account',
    component: DashboardLayoutForAdmin,
    redirect: '/account/accountList',
    children: [
      {
        path: 'accountList',
        name: 'accountList',
        component: AccountList
      },
      {
        path: 'signUp',
        name: 'signUp',
        component: SignUp
      }
    ]
  },
  {
    path: '/setting',
    component: Setting
  },
  {
    path: '/assignment',
    component: Assignment
  },
  {
    path: '/addcourse',
    component: addCourse
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
