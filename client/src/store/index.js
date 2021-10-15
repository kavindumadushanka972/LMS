import {createStore} from 'vuex'
import { deleteCourse } from '../../../controllers/courseCtrl'


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
      console.log('removing ' +  state.courses.indexOf(payload))
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
        
        const res = await fetch('http://localhost:5000/user/infor', {
            method: "GET",
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Authorization: context.getters.authToken
            },
            credentials: 'include',
        })

        const data = await res.json()
        context.commit('setUser', data)
        // console.log(data)
      },
      async updateCourseList(context, payload) {
          const res = await fetch('http://localhost:5000/user/enroll', {
              method: "PATCH",
              mode: 'cors',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: context.getters.authToken
              },
              credentials: 'include',
              body: JSON.stringify({course: payload})
          }).catch(err => {throw err})

          if (res.status == 200) {
              const data = await res.json()
              context.commit('setUserCourseList', payload)
          } else {
            throw 'could not enroll'
          }
      },
      async fetchCourses(context, payload) {  // get courses for given id list
        context.commit('clearCourses')
        
        for (let id of payload) {
          
          const res = await fetch(`http://localhost:5000/api/courses/${id}`)
          const data = await res.json()
          if (res.status != 200) {
              console.log(data.msg)
              return
          }
          context.commit('insertCourse', data)
          console.log(data)
        }
    },
    async fetchVideos(context, payload) { //fetch videos for a given course id
      const res = await fetch(`http://localhost:5000/api/videos/${payload}`, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: context.getters.authToken
        },
        credentials: 'include',
      })
      if (res.status == 200) {
        const data = await res.json()
        console.log('data: ' + data)
        context.commit('setVideos', data)
      } else {
        throw 'could not load videos'
      }
      
    },
    async deleteCourse(context, payload) {
        const res = await fetch(`http://localhost:5000/api/courses/${payload}`, {
          method: "DELETE",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: context.getters.authToken
          },
          credentials: 'include',
        })
        if (res.status == 200) {
          const data = await res.json()
          context.commit('removeCourse', payload)
          console.log(data)
        } else {
          throw 'could not delete course'
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