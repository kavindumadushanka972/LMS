<template>
  <div>
    <section id=top-section>
      <div class="header-line">
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
        <p>
          All of our teachers are qualified teachers who has years of experience and
           know exactly how to deal with students of all ages. 
        </p>
      </div>
       <div class="feature col-lg-4">
         <i class="fas fa-laptop-house"></i>
        <h4>Designed for online</h4>
            <p>
              The courses we offer are carefully designed for online education with 
              great use of multimedia technologies. Proven to be successful. 
            </p>

      </div>
       <div class="feature col-lg-4">
         <i class="fas fa-industry"></i>

        <h4>Industry approved content</h4>
          <p>
            Content is especially created for practival usage and all the courses consists of
            projects that gives students hands on experience. 
          </p>
      </div>
      </div>
     

    </section>

    <section>
      <div class="row ">
        <div class="col row justify-content-center feature-container">
          <div class="col-xl-4 col-sm-9" >
            <h4>Well organized for kids</h4>
            <p>
              Due to pandemic many students struggle to get back to there studies. But the content of our courses are 
              interesting and exciting so that you can study for a long time without getting bored. And the courses for 
              children around 10-15 years specially designed suitablly for their mind. And they focus of giving experience 
              similar to real classrooom.
            </p>
          </div>
          <div class="col-md-3">
            <img src="../assets/images/teacher.jpg" alt="best teachers">
          </div>
        </div>
      </div>

       <div class="row ">
         
        <div class="col row justify-content-center feature-container feature-container-left">
          <div class="col-md-3">
            <img src="../assets/images/kid-taking-notes.jpg" alt="best teachers">
          </div>
          <div class="col-xl-4 col-sm-9" >
            <h4>Even on the go</h4>
            <p>
              Our platform works with any mobile or desktop device. You can watch course videos even when travelling using your time 
              effectively. And also you can share them with your friends to earn bonuses. We offer courses for wide range of categories,
              includeing programming, science, art, english, etc. 
            </p>
          </div>
          
        </div>
      </div>

      
    </section>

   
    <section id="course-section">
      <h2 class="section-header">Featured Courses for you</h2>
      <div class="row">
       <Course :key="course.title" v-for="course in featuredCourses" :course="course"/>
      </div>
    </section>

     <section id="joinus-section">
      <h4>Don't wait join us today...</h4>
        <button class="btn btn-dark" @click="$router.push('/register')">Sign up</button>
        <button class="btn btn-outline-primary" @click="$router.push('/login')">Log in</button>
      
    </section>

    <section id="testimonial-section">
      
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header'
import Footer from '../components/Footer'
import Course from '../components/Course'
import {mapState, mapGetters} from 'vuex'
import CourseService from '../services/CourseService'
import UserService from '../services/UserService'
import EventBus from '../common/EventBus'

export default {
  name: 'Home',
  components: {
    Course,
    Header
  },
  data() {
    return {
      featuredCourses: []
    }
  },
  async created() {
    EventBus.trigger('startLoading')
    await this.$store.dispatch('loadUser')
    this.featuredCourses = await this.fetchFeaturedCourses()
    EventBus.trigger('endLoading')
  },
  methods: {
        async fetchFeaturedCourses() {
            const courses = await CourseService.getCoursesByQuery({page: 1, sort: '-enrolled_number'})
            return courses.slice(0, 4)
        }
    },
    computed: {
      ...mapState(['user']),
      ...mapGetters(['authenticated'])
    }
}
</script>

<style scoped>
#top-section {
  background-color: #A0E7E5;
  height: 90vh;
  padding-top: 40px;
  min-height: 30rem;
  background-image: url("~@/assets/images/home-background.jpg");
  background-position: 40% 60%;
}
h2 {
  font-weight: 600;
}
.section-header {
  text-align: center;
  font-weight: 400;
  margin-bottom: 40px;
  line-height: 2rem;
}
.header-line {
  text-align: center;
  padding: 2rem;
  margin-top: 5rem;
}
#course-section, #features-section {
  padding: 30px;
  text-align: center;
}
#features-section {
  min-height: 50vh;
}
.feature-container {
  /* background-color: #A0E7E5; */
  padding: 2rem;
  text-align: left;
  /* border-radius: 1rem; */
  overflow: hidden;
  margin-top: 30px;
  
}
.feature-container img {
  width: 20vw;
}
.feature-container-left {
  text-align: left;
}
#joinus-section .btn{
  margin-left: 1rem;
  width: 9rem;
}
#joinus-section h4 {
  display: inline;
  margin-right: 4rem;

}
#joinus-section {
  /* background-color: #A0E7E5 ; */
  height: 5rem;
  padding-top: 1.5rem;
  margin-bottom: 4rem;
}
.feature {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 20px;
  margin-bottom: 50px;
}
.fas {
  display: block;
  font-size: 2rem;
  margin-bottom: 20px;
}
</style>