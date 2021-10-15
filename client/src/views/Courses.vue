<template>
    <div class="courses justify-content-start">
        <h1>Find Courses of Your Dreams</h1>
       
        <CourseSearch/>
        <div class="row justify-content-start">
            <Course :key="course.id" v-for="course in courses" :course="course" :mode="'common'"/>
        </div>
        <div class="bottom-control">
            <button v-if="page > 1" class="btn btn-dark" @click="prevPage"><i class="fas fa-arrow-left"></i></button>
            <p>Page {{ page }}</p>
            <button v-if="showNextButton" class="btn btn-dark" @click="nextPage"><i class="fas fa-arrow-right"></i></button>
        </div>
        
    </div>
   
</template>

<script>
import Course from '../components/Course'
import CourseSearch from '../components/CourseSearch'

export default {
    name: 'Courses',
    components: {
        Course,
        CourseSearch
    },
    data() {
        return {
            courses: [],
            couseView: false,
            page: 1,
            category: 'all'
        }
    },
    async mounted() {
        this.page = parseInt(this.$route.query.page)
        this.courses = await this.fetchCourses(this.$route.query.param)
    //    console.log(localStorage.auth)

    },
    methods: {
        async fetchCourses(query) {
            const res = await fetch(`http://localhost:5000/api/courses?` + new URLSearchParams(query))

            if (res.status != 200) {
                return []
            }
        
            const data = await res.json()
            console.log(data)

            return data.courses
        },
        async nextPage() {
            this.page++
            this.$router.push({query: {page: this.page}})
            this.courses = await this.fetchCourses({page: this.page})
        },
        async prevPage() {
            this.page--
            this.$router.push({query: {page: this.page}})
            this.courses = await this.fetchCourses({page: this.page})
        }
        
    },
    computed: {
        showNextButton() {
            return this.courses.length > 0 && this.courses.length == 9
        }
    }
}
</script>

<style scoped>
h1 {
    font-weight: 400;
}
.courses {
    text-align: left;
    padding: 15px;
    margin: 20px;
    width: 100%;
}
.row {
    width: 100%;
}
.row {
    width: fit-content;
    margin: 30px auto 0 auto;
}
.bottom-control {
    text-align: center;
}
.bottom-control p {
    display: inline;
    margin: 30px;
}
.category-select {

}

</style>