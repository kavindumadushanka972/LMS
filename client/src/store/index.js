import {createStore} from 'vuex'


const store = createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      // console.log(payload)
        state.user = payload
    },
    setCourseList(state, payload) {
      state.user.courses = payload
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
      updateCourseList(context, payload) {
        
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
      return getters.authToken !== null
    }
  }
})

export default store