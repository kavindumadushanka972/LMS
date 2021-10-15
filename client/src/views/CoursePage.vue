<template>
    <div class="container col-lg-7" v-if="course">
        <h1>{{ course.title }}</h1>
        <h5>by {{ course.owner_name }}</h5>
        <img class="main-img" :src="course.image_url" :alt="course.title"/>
        <p>{{ course.description }}</p>
        <p>Category: <b>{{ course.category }}</b></p>
        <div v-if="user">
            <div v-if="user.role==1">
                <div v-if="!enrolled">
                    <button class="btn btn-primary" @click="enroll">Enroll Now</button>
                    <button class="btn btn-outline-dark">Add to Wishlist</button>
                </div>
                <h4 v-else>Enrolled</h4>
            </div>
            <div v-else-if="isCourseOwner">
                <button class="btn btn-outline-dark" @click="$router.push(`/course-editor/${course._id}`)">Edit Course</button>
                <button class="btn btn-info" @click="$router.push(`/video-editor/${course._id}`)">+ Add Video</button>
                <button class="btn btn-danger" @click="deleteCourse">Delete Course</button>
            </div>
        </div>
        <div v-else>
            <button class="btn btn-primary" @click="$router.push('/login')">Login to Enroll</button>
        </div>
        <div v-if="enrolled || isCourseOwner" class="video-container">
            <h2>{{ videos.length > 0 ? 'Watch Course Videos' : 'No Videos Yet' }}</h2>
            <Video :key="video._id" v-for="video in videos" :video="video"/>
        </div>
      
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Video from '../components/Video'

export default {
    name: 'CoursePage',
    components: {
        Video
    },
    data() {
        return {
            course: null,
            enrolled: false,

        }
    },
    async mounted() {
        await this.$store.dispatch('loadUser')
        await this.fetchCourses([this.$route.params.id])
        this.course = this.courses[0]
        await this.fetchVideos([this.course._id])
        console.log('vids: ' + this.videos)
        this.enrolled = this.alreadyEnrolled()
        console.log('mount')
    },
    methods: {
        async enroll() {
            const newCourseList = Object.values(this.user.courses)
            newCourseList.push(this.course._id)
            this.$store.dispatch('updateCourseList', newCourseList)
            .then(() => this.enrolled = true)
            .catch(console.log)
        },
        alreadyEnrolled() {
            if (!this.user) {
                return false
            }
            return Object.values(this.user.courses).indexOf(this.course._id) > -1
        },
        deleteCourse() {
            if (!confirm('Are you sure want to delete this course?')) {
                return
            }
            this.deleteCourseStore(this.course._id)
            .then(() => this.$router.push('/'))
            .catch(console.log)
        },
        ...mapActions(['fetchCourses', 'fetchVideos']),
        ...mapActions({deleteCourseStore: 'deletecCourse'})
    },
    computed: {
        isCourseOwner() {
            if (!this.user) {
                return false
            }
            return this.user.role == 2 && this.course.owner_id == this.user._id
        },
        ...mapState(['user', 'courses', 'videos'])
    }
}
</script>

<style scoped>
.container {
    padding-left: 20px;
    padding-right: 20px;
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
.video-container {
    margin-top: 50px;
    text-align: center;
}

</style>