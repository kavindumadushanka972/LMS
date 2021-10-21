import {createStore} from 'vuex'
import CategoryService from '../services/CategoryService'

import UserService from '../services/UserService'
import VideoService from '../services/VideoService'

const store = createStore({
  state: {
    user: null,
    courses: [],
    videos: [],
    categories: []
  },
  mutations: {
    setUser(state, payload) {
        state.user = payload
    },
    setUserCourseList(state, payload) {
      state.user.courses = payload
    },
    insertCourse(state, payload) {
      state.courses.push(payload)
    },
    clearCourses(state) {
      state.courses = []
    },
    clearVideos(state) {
      state.videos = []
    },
    setVideos(state, payload) {
      state.videos = payload
    },
    setCourseList(state, payload) {
      state.courses = payload
    },
    removeCourse(state, payload) {
      state.courses = state.courses.filter((elem) => elem._id !== payload)
    },
    removeVideo(state, payload) {
      state.videos = state.videos.filter((video) => video._id != payload)
    },
    setCategories(state, payload) {
      state.categories = payload
    },
    addCategory(state, payload) {
      state.categories.push(payload)
    },
    removeCategory(state, payload) {
      state.categories = state.categories.filter((elem) => elem._id !== payload)
    }
  },
  actions: {
      async loadUser(context) {
        if (context.state.user) {
          return
        }

        if (!context.getters.authToken) {
          context.commit('setUser', null)
          return
        }
        
        try {
          const data = await UserService.getUser()
          context.commit('setUser', data)
        } catch(err) {
          context.commit('setUser', null)
          console.log(err)
        }
       
      },
      async fetchVideos(context, payload) { //fetch videos for a given course id
        try {
          const videos = await VideoService.getVideosByCourseId(payload)
          context.commit('setVideos', videos)

        } catch(err) {
          console.log(err)
        }
        
      },
      async deleteVideo(context, payload) { // delete video of given video id
        try {
          await VideoService.deleteVideo(payload)
          context.commit('removeVideo', payload)
        } catch(err) {
          
        }
      },
      async fetchCategories(context) {  // fetch all categories 
        try {
          const categories = await CategoryService.getCategories()
          context.commit('setCategories', categories)

        } catch(err) {
          console.log(err)
        }
      },
      async createCategory(context, payload) { // create category payload={name:...}
        try {
          await CategoryService.createCategory(payload.name)
          context.dispatch('fetchCategories')
        } catch(err) {
          console.log(err)
        }
      },
      async deleteCategory(context, payload) {  // delete given category payload=categoryobject
        try {
          await CategoryService.deleteCategory(payload)
          context.dispatch('fetchCategories')

        } catch(err) {
          console.log(err)
        }
      }

  },
  getters: {
    authToken(state) {
      if (typeof localStorage.auth === 'undefined' || localStorage.auth == null) {
        return null
      }
      return localStorage.auth
    },
    getUser(state) {
      return state.user
    },
    authenticated(state, getters) {
      return state.user !== null
    }
  }
})

export default store