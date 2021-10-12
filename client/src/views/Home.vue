<template>
  <div>
    <section id=top-section>
      <div class="header-line container-fluid">
        <h1>Thirsty For Learing? </h1>
        <h4>We offer best online video courses for you. </h4>
        <button class="btn btn-dark" @click="$router.push('/register')">Get Started</button>
        <p>Already have an account? <router-link to="/login">login</router-link></p>
      </div>
    </section>
    <section id="featured-section">
      <h2>Featured Courses for you</h2>
      <div class="row">
       <Course :key="course.title" v-for="course in featuredCourses" :course="course"/>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import Header from '../components/Header'
import Course from '../components/Course'


export default {
  name: 'Home',
  components: {
    Course
  },
  data() {
    return {
      featuredCourses: []
    }
  },
  async created() {
    this.featuredCourses = await this.fetchFeaturedCourses()
  },
  methods: {
        async fetchFeaturedCourses() {
            // const res = await fetch('http://localhost:5000/api/courses?')
            const res = await fetch('http://localhost:5000/api/courses?' + new URLSearchParams({
                sorted: 'enrolled_number',
                page: 1
            }))

            if (res.status != 200) {
                return []
            }
        
            const data = await res.json()
            console.log(data.courses)
            return data.courses.slice(0, 3)
        }
    }
}
</script>

<style scoped>
#top-section {
  background-color: #A0E7E5;
  height: 90vh;
  padding-top: 40px;
}
h1, h2 {
  font-family: 'Montserrat', sans-serif;
}
h2 {
  text-align: left;
  font-weight: 600;
  margin-bottom: 10px;
}
.header-line {
  text-align: center;
  padding: 2rem;
}
#featured-section {
  padding: 30px;
}
</style>