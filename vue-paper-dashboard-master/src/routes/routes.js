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

import Login from 'src/components/Login/Login.vue'
import DashboardLayoutOfCourseManager from '../components/Dashboard/Layout/DashboardLayoutOfCourseManager'
import DashboardLayoutOfAccountManager from '../components/Dashboard/Layout/DashboardLayoutOfAccountManager'
import DashboardLayoutOfAssignmentManager from '../components/Dashboard/Layout/DashboardLayoutOfAssignmentManager.vue'
import DashboardLayoutOfStudent from '../components/Dashboard/Layout/DashboardLayoutOfStudent'

import CourseList from 'src/components/Dashboard/Views/CourseList.vue'
import AssignmentList from 'src/components/Dashboard/Views/AssignmentList.vue'
import AssignmentListForGrading from 'src/components/Dashboard/Views/AssignmentListForGrading'
import AssignmentListForStudent from 'src/components/Dashboard/Views/AssignmentListForStudent'
import gradeListForStudent from 'src/components/Dashboard/Views/gradeListForStudent'
import AccountList from 'src/components/Dashboard/Views/AccountList'
import SignUp from 'src/components/Dashboard/Views/SignUp'
import GradingAssignment from 'src/components/Dashboard/Views/GradingAssignment'
import AddAssignment from 'src/components/Dashboard/Views/AddAssignment'
import addCourse from 'src/components/Dashboard/Views/addCourse'
import TeacherProfile from 'src/components/Dashboard/Views/TeacherProfile'
import StudentProfile from 'src/components/Dashboard/Views/StudentProfile'

const routes = [
  {
    path: '/default',
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
        path: 'table-list',
        name: 'table-list',
        component: TableList
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/teacher',
    component: DashboardLayoutOfCourseManager,
    redirect: '/teacher/Course',
    children: [
      {
        path: 'Course',
        name: 'Course',
        component: CourseList
      },
      {
        path: 'addCourse',
        name: 'addCourse',
        component: addCourse
      },
      {
        path: 'profile',
        name: 'profile',
        component: TeacherProfile
      }
    ]
  },
  {
    path: '/Course',
    component: DashboardLayoutOfAssignmentManager,
    redirect: '/Course/assignmentList',
    children: [
      {
        path: 'assignmentList',
        name: 'assignmentList',
        component: AssignmentList
      },
      {
        path: 'gradingAssignment',
        name: 'gradingAssignment',
        component: GradingAssignment
      },
      {
        path: 'assignmentListForGrading',
        name: 'assignmentListForGrading',
        component: AssignmentListForGrading
      },
      {
        path: 'gradingAssignment',
        name: 'gradingAssignment',
        component: GradingAssignment
      },
      {
        path: 'addAssignment',
        name: 'addAssignment',
        component: AddAssignment
      }
    ]
  },
  {
    path: '/homework',
    component: DashboardLayoutOfStudent,
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
      },
      {
        path: 'profile',
        name: 'profile',
        component: StudentProfile
      }
    ]
  },
  {
    path: '/account',
    component: DashboardLayoutOfAccountManager,
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
