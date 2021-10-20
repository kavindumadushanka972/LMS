<template>
  <div>
    <Toast/>
    <Header/>
    <Loading v-if="loading"/>
    <router-view :class="loading ? 'hidden':''"/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import EventBus from './common/EventBus'
import Toast from './components/Toast'
import UserService from './services/UserService'
import Loading from './components/Loading'

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Toast,
    Loading
  },
  data() {
    return {
      loading: false
    }
  },
  async mounted() {
    EventBus.on('logout', async (data) => {
      try {
        await UserService.logout()
        this.$store.commit('setUser', null)
        this.$router.push('/')
      } catch(err) {
        EventBus.trigger('toast', err)
      }
    })

    EventBus.on('startLoading', () => this.loading = true)
    EventBus.on('endLoading', () => this.loading = false)

  }
}
</script>

<style>
body {
  background-color: white;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Montserrat', sans-serif;
  min-height: 70vh;
}

h1, h2, h3, h4 {
  font-weight: 600;
}
p {
  font-size: 1rem;
}
.ilearn-l {
  color:blueviolet;
}
a:hover {
  text-decoration: none;
}
.truncated-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hidden {
  visibility: hidden;
}
</style>
