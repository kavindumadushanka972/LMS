import {createStore} from 'vuex'


const store = createStore({
  state: {
    user: null,
    courses: []
  },
  mutations: {
    setUser(state, payload) {
      // console.log(payload)
        state.user = payload
    },
    setCourseList(state, payload) {
      state.user.courses = payload
    },
    insertCourse(state, payload) {
      state.courses.push(payload)
    },
    clearCourses(state) {
      state.courses = []
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
          context.commit('clearCourses')
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
              context.commit('setCourseList', payload)
          } else {
            throw 'could not enroll'
          }
      },
      async fetchCourses(context, payload) {  // get courses for given id list
        for (let id of payload) {
          
          const res = await fetch(`http://localhost:5000/api/courses/${id}`)
          const data = await res.json()
          if (res.status != 200) {
              console.log(data.msg)
              return
          }
          context.commit('insertCourse', data)
        }
        console.log(context.state.courses)
    },
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