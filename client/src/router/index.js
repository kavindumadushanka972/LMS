import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Courses from '../views/Courses'
import Register from '../views/Register'
import CoursePage from '../views/CoursePage'
import Dashboard from '../views/Dashboard'
import CourseEditor from '../views/CourseEditor'
import VideoEditor from '../views/VideoEditor'
import About from '../views/About'
import store from '../store'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }, 
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/course/:id',
    name: 'CoursePange',
    component: CoursePage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/course-editor',
    name: 'CourseCreator',
    component: CourseEditor
  },
  {
    path: '/course-editor/:id',
    name: 'CourseEditor',
    component: CourseEditor
  },
  {
    path: '/video-editor/:courseid',
    name: 'VideoCreator',
    component: VideoEditor
  },
  {
    path: '/video-editor/:courseid/:videoindex',
    name: 'VideoEditor',
    component: VideoEditor
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name == 'Home') {
    store.dispatch('loadUser')
    .then(() => {
      if (store.getters.authenticated) {
        next({name: 'Dashboard'})
      } else {
        next()
      }
    })
  } else {
    next()
  }
})


export default router
