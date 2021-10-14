<template>
    <div class="container" v-if="course">
        <h1>{{ course.title }}</h1>
        <h5>by {{ course.owner_name }}</h5>
        <img class="main-img" :src="course.image_url" :alt="course.title"/>
        <p>{{ course.description }}</p>
        <div v-if="user">
            <div v-if="user.role==1">
                <div v-if="!enrolled">
                    <button class="btn btn-primary" @click="enroll">Enroll Now</button>
                    <button class="btn btn-outline-dark">Add to Wishlist</button>
                </div>
                <h4 v-else>Enrolled</h4>
            </div>
            
        </div>
        <div v-else>
                <button class="btn btn-primary" @click="$router.push('/login')">Login to Enroll</button>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'CoursePage',
    data() {
        return {
            course: null,
            enrolled: false
        }
    },
    async mounted() {
        await this.$store.dispatch('loadUser')
        this.course = await this.fetchCourse()
        this.enrolled = this.alreadyEnrolled()
    },
    methods: {
        async fetchCourse() {
            const res = await fetch(`http://localhost:5000/api/courses/${this.$route.params.id}`)

            if (res.status != 200) {
                console.log('fetch error')
                return undefined
            }

            const data = await res.json()
            return data
        },
        async enroll() {
            const newCourseList = Object.values(this.user.courses)
            newCourseList.push(this.course._id)
            this.$store.dispatch('updateCourseList', newCourseList)
            .then(() => this.enrolled = true)
            .catch(console.log)
        },
        alreadyEnrolled() {
            return Object.values(this.user.courses).indexOf(this.course._id) > -1
        },
    },
    computed: {
        
        ...mapState(['user'])
    }
}
</script>

<style scoped>
.container {
    padding-left: 10%;
    padding-right: 10%;
    text-align: left;
    padding-bottom: 60px;
}
h1 {
    margin-top: 30px;
    margin-bottom: 5px;
}
.main-img {
    width: 100%;
    margin-top: 40px;
}
p {
    margin-top: 50px;
    margin-bottom: 50px;
}
.btn {
    margin-right: 10px;
}
</style>