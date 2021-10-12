<template>
  <div>
    <section id=top-section>
      <div class="header-line container-fluid">
        <h1>Thirsty For Learning? </h1>
        <h4>We offer best online video courses for you. </h4>
        <button class="btn btn-dark" @click="$router.push('/register')">Get Started</button>
        <p>Already have an account? <router-link to="/login">login</router-link></p>
      </div>
    </section>

    <section id="features-section">
      <h2 class="section-header">Why us?</h2>
      <div class="row">
      <div class="feature col-lg-4">
         <i class="fas fa-chalkboard-teacher"></i>
        <h4>Best Teachers</h4>
        <p>All of our teachers are the best</p>
      </div>
       <div class="feature col-lg-4">
         <i class="fas fa-laptop-house"></i>
        <h4>Latest teaching methods</h4>
        <p>All of our teachers are the best</p>
      </div>
       <div class="feature col-lg-4">
         <i class="fas fa-chalkboard-teacher"></i>

        <h4>Best Teachers</h4>
        <p>All of our teachers are the best</p>
      </div>
      </div>
    </section>
    <section id="course-section">
      <h2 class="section-header">Featured Courses for you</h2>
      <div class="row">
       <Course :key="course.title" v-for="course in featuredCourses" :course="course"/>
      </div>
    </section>
    <section id="testimonial-section">
      
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
            return data.courses.slice(0, 4)
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
h2 {
  font-weight: 600;
}
.section-header {
  text-align: left;
  font-weight: 400;
  margin-bottom: 70px;
}
.header-line {
  text-align: center;
  padding: 2rem;
}
#course-section, #features-section {
  padding: 30px;
  text-align: center;
}
#features-section {
  min-height: 50vh;
}
#testimonial-section {
  background-color: #A0E7E5 ;
  height: 5rem;
  padding-top: 2rem;
}
.feature {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 20px;
}
.fas {
  display: block;
  font-size: 2rem;
  margin-bottom: 20px;
}
</style>