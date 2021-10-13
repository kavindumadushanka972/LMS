import {createStore} from 'vuex'


const store = createStore({
  state: {
    auth: null
  },
  mutations: {
    setAuth(state, auth) {
        state.auth = auth
    }
  },
  actions: {
      
  },
  getters: {
    authToken(state) {
      return state.auth
    }
  }
})

export default store