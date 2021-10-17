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
  font-family: 'Montserrat', sans-serif;
}

h1, h2, h3, h4 {
  font-weight: 600;
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
