<template>
    <div class="container col-lg-7" v-if="course">
       
        
        <div v-if="!videoMode">
            <h1>{{ course.title }}</h1>
            <h5>by {{ course.owner_name }}</h5>
            <img class="main-img" :src="course.image_url" :alt="course.title"/>
            <p>{{ course.description }}</p>
            <p>Category: <b>{{ course.category }}</b></p>
            <p>Enrolled number: <b>{{ course.enrolled_number }}</b></p>
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
                <!-- <Video :key="video._id" v-for="video in videos" :video="video" :mode="isCourseOwner? 'admin' : 'viewer'"/> -->
                <div class="video-tag" :key="video._id" v-for="(video, index) in videos" :video="video" @click="setVideoMode(video)">
                    <!-- <router-link :to="`course/${course._id}/${video._id}`">{{video.title}}</router-link> -->
                    <p>{{ `${index + 1}. ${video.title}` }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <button class="btn btn-dark btn-sm" @click="setCourseMode"><i class="fas fa-arrow-left"></i> Back to course home</button>
            <h1>{{ `${course.title}: ${currentVideo.title}` }}</h1>
            <Video :video="currentVideo" :mode="isCourseOwner? 'admin' : 'viewer'"/>
        </div>
      
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Video from '../components/Video'
import CourseService from '../services/CourseService'
import UserService from '../services/UserService'

export default {
    name: 'CoursePage',
    components: {
        Video
    },
    data() {
        return {
            course: null,
            enrolled: false,
            videoMode: false,
            currentVideo: null
        }
    },
    async mounted() {
        await this.$store.dispatch('loadUser')
        // await this.fetchCourses([this.$route.params.id])
        const courses = await CourseService.getCoursesByIds([this.$route.params.id])

        // console.log(courses[0])
        this.course = courses[0]
        // this.course = this.courses[0]
        await this.fetchVideos([this.course._id])
        console.log('vids: ' + this.videos)
        this.enrolled = this.alreadyEnrolled()
        // console.log(this.course)
    },
    methods: {
        async enroll() {
            try {
                // const newCourseList = Object.values(this.user.courses)
                // newCourseList.push(this.course._id)
                // this.$store.dispatch('updateCourseList', newCourseList)
                // .then(() => this.enrolled = true)
                // .catch(console.log)
                // await this.updateCourseList(newCourseList)
                UserService.enroll(this.course._id)
                this.enrolled = true
                this.course.enrolled_number++
            } catch(err) {
                // toast
                console.log(err)
            }
        },
        alreadyEnrolled() {
            if (!this.user) {
                return false
            }
            return Object.values(this.user.courses).indexOf(this.course._id) > -1
        },
        async deleteCourse() {
            if (!confirm('Are you sure want to delete this course?')) {
                return
            }

            try {
                await CourseService.deleteCourse(this.course._id)
                this.$store.commit('removeCourse', this.course._id)
                this.$router.push('/')
            } catch(err) {
                // Toast
            }
        },
        setVideoMode(video) {
            this.currentVideo = video
            this.videoMode = true 
        },
        setCourseMode() {
            this.videoMode = false 
            this.currentVideo = null
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
    text-align: left;
    padding: 20px 20px 60px 20px;
}
h1 {
    margin-top: 10px;
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
.video-tag {
    border: 3px solid #e5e5e5;
    /* background-color: #e5e5e5; */
    padding: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    /* height: 4rem; */
}
.video-tag p {
    text-align: left;
    margin: 10px 5px;
}
.video-tag:hover {
    border-color: #A0E7E5;
}
</style>