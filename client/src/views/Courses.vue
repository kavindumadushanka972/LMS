<template>
    <div class="courses">
        <h1>Find Courses of Your Dreams</h1>
        <div class="row">
            <Course :key="course.title" v-for="course in courses" :course="course"/>
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
            courses: []
        }
    },
    async created() {
        this.courses = await this.fetchCourses()
        // this.courses = [
        //     {
        //         title: "C++ master class",
        //         description: "best course out there",
        //         category: "programming"
        //     },
        //     {
        //         title: "Python bootcamp",
        //         description: "best course out there",
        //         category: "programming"
        //     },
        //     {
        //         title: "Art & craft",
        //         description: "best course out there",
        //         category: "art"
        //     },
        //     {
        //         title: "Android development",
        //         description: "best course out there",
        //         category: "programming"
        //     },
        //     {
        //         title: "How to coook pizza",
        //         description: "best course out there",
        //         category: "art"
        //     }
        // ]
    },
    methods: {
        async fetchCourses() {
            const res = await fetch('http://localhost:5000/api/courses?page=1')

            if (res.status != 200) {
                return []
            }
        
            const data = await res.json()
            console.log(data.courses)
            return data.courses
        }
    }
}
</script>

<style scoped>
.courses {
    text-align: left;
    padding: 15px;
}
.row {
    width: fit-content;
    margin: 30px auto 0 auto;
}
</style>