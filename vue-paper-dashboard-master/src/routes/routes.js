// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

import Login from 'src/components/Login/Login.vue'
import DashboardLayoutOfAdminManager from '../components/Dashboard/Layout/DashboardLayoutOfAdminManager'
import DashboardLayoutOfTeacherManager from '../components/Dashboard/Layout/DashboardLayoutOfTeacherManager'
import DashboardLayoutOfCourseManager from '../components/Dashboard/Layout/DashboardLayoutOfCourseManager.vue'
import DashboardLayoutOfStudent from '../components/Dashboard/Layout/DashboardLayoutOfStudent'

// teacher/course
import AssignmentList from 'src/components/Dashboard/Views/teacher/course/AssignmentList.vue'
import AssignmentListForGrading from 'src/components/Dashboard/Views/teacher/course/AssignmentListForGrading'
import GradingAssignment from 'src/components/Dashboard/Views/teacher/course/GradingAssignment'
import AddAssignment from 'src/components/Dashboard/Views/teacher/course/AddAssignment'

// student
import SearchGradeList from 'src/components/Dashboard/Views/student/SearchGradeList'
import AssignmentListForStudent from 'src/components/Dashboard/Views/student/AssignmentListForStudent'

// teacher
import CourseList from 'src/components/Dashboard/Views/teacher/CourseList.vue'

// account
import AddCourse from 'src/components/Dashboard/Views/admin/AddCourse'
import SignUp from 'src/components/Dashboard/Views/admin/SignUp'
import AccountList from 'src/components/Dashboard/Views/admin/AccountList'
import AllCourseList from 'src/components/Dashboard/Views/admin/AllCourseList'
import CourseInfo from 'src/components/Dashboard/Views/admin/CourseInfo'
import AssignCourse from 'src/components/Dashboard/Views/admin/AssignCourse'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/teacher',
    component: DashboardLayoutOfTeacherManager,
    redirect: '/teacher/Course',
    children: [
      {
        path: 'Course',
        name: 'Course',
        component: CourseList
      }
    ]
  },
  {
    path: '/teacher/Course/:courseId/',
    component: DashboardLayoutOfCourseManager,
    redirect: '/teacher/Course/:courseId/assignmentList',
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
        path: 'addAssignment',
        name: 'addAssignment',
        component: AddAssignment
      }
    ]
  },

  {
    path: '/student',
    component: DashboardLayoutOfStudent,
    redirect: '/student/assignmentListForStudent',
    children: [
      {
        path: 'assignmentListForStudent',
        name: 'assignmentListForStudent',
        component: AssignmentListForStudent
      },
      {
        path: 'searchGradeList',
        name: 'searchGradeList',
        component: SearchGradeList
      }
    ]
  },
  {
    path: '/account',
    component: DashboardLayoutOfAdminManager,
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
      },
      {
        path: 'addCourse',
        name: 'addCourse',
        component: AddCourse
      },
      {
        path: 'allCourseList',
        name: 'allCourseList',
        component: AllCourseList
      },
      {
        path: 'courseInfo',
        name: 'courseInfo',
        component: CourseInfo
      },
      {
        path: 'assignCourse',
        name: 'assignCourse',
        component: AssignCourse
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
