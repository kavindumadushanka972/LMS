<template>
    <div class="courses">
        <h1>Find Courses of Your Dreams</h1>
        <div class="row">
            <Course :key="course.id" v-for="course in courses" :course="course"/>
        </div>
    </div>
   
</template>

<script>
import Course from '../components/Course'

export default {
    name: 'Courses',
    components: {
        Course
    },
    data() {
        return {
            courses: [],
            couseView: false
        }
    },
    async created() {
        this.courses = await this.fetchCourses()
    },
    methods: {
        async fetchCourses() {
            const res = await fetch('http://localhost:5000/api/courses?page=1')

            if (res.status != 200) {
                return []
            }
        
            const data = await res.json()
            console.log(data)

            return data.courses
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
}
.row {
    width: fit-content;
    margin: 30px auto 0 auto;
}
</style>