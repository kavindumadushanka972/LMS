<template>
  <div>
    <Toast/>
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'
import EventBus from './common/EventBus'
import Toast from './components/Toast'
import UserService from './services/UserService'

export default {
  name: "App",
  components: {
    Header,
    Toast
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
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Montserrat', sans-serif;
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
</style>
