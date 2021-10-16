import {createStore} from 'vuex'
import CourseService from '../services/CourseService'

import UserService from '../services/UserService'
import VideoService from '../services/VideoService'

const store = createStore({
  state: {
    user: null,
    courses: [],
    videos: []
  },
  mutations: {
    setUser(state, payload) {
      // console.log(payload)
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
      console.log('setvid: ' + payload)
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

        await UserService.getUser()
        .then((data) => context.commit('setUser', data))
        .catch((err) => context.commit('setUser', null))
      },
      async updateCourseList(context, payload) {
        await UserService.enroll(payload)
        context.commit('setUserCourseList', payload)
      },
    //   async fetchCourses(context, payload) {  // get courses for given id list
        
    //     // for (let id of payload) {
          
    //     //   const res = await fetch(`http://localhost:5000/api/courses/${id}`)
    //     //   const data = await res.json()
    //     //   if (res.status != 200) {
    //     //       console.log(data.msg)
    //     //       return
    //     //   }
    //     //   context.commit('insertCourse', data)
    //     //   console.log(data)
    //     // }
    //     try {
    //       const courses = await CourseService.getCoursesByIds(payload)
    //       context.commit('setCourseList', courses)
    //     } catch (err) {
    //       context.commit('clearCourses')
    //       console.log('reject')
    //     }
    // },
    async fetchVideos(context, payload) { //fetch videos for a given course id
      // const res = await fetch(`http://localhost:5000/api/videos/${payload}`, {
      //   method: "GET",
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: context.getters.authToken
      //   },
      //   credentials: 'include',
      // })
      // if (res.status == 200) {
      //   const data = await res.json()
      //   console.log('data: ' + data)
      //   context.commit('setVideos', data)
      // } else {
      //   throw 'could not load videos'
      // }
      try {
        const videos = await VideoService.getVideosByCourseId(payload)
        context.commit('setVideos', videos)

      } catch(err) {
        console.log(err)
      }
      
    },
    // async deleteCourse(context, payload) {
    //     const res = await fetch(`http://localhost:5000/api/courses/${payload}`, {
    //       method: "DELETE",
    //       mode: 'cors',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: context.getters.authToken
    //       },
    //       credentials: 'include',
    //     })
    //     if (res.status == 200) {
    //       const data = await res.json()
    //       context.commit('removeCourse', payload)
    //       console.log(data)
    //     } else {
    //       throw 'could not delete course'
    //     }
    // }, 
    async deleteVideo(context, payload) { // delete video of given video id
    //   const res = await fetch(`http://localhost:5000/api/videos/${payload}`, {
    //     method: "DELETE",
    //     mode: 'cors',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: context.getters.authToken
    //     },
    //     credentials: 'include',
    //   })
    //   if (res.status == 200) {
    //     const data = await res.json()
    //     context.commit('removeVideo', payload)
    //     console.log(data)
    //   } else {
    //     throw 'could not delete video'
    //   }

      try {
        await VideoService.deleteVideo(payload)
        context.commit('removeVideo', payload)
      } catch(err) {
        
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