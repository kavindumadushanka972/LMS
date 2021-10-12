<template>
  <div>
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: "App",
  components: {
    Header
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
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-weight: 600;
}

.ilearn-l {
  color:blueviolet;
}
a:hover {
  text-decoration: none;
}
</style>
