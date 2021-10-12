import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Courses from '../views/Courses'
import Register from '../views/Register'
import CoursePage from '../views/CoursePage'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
