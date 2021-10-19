<template>
    <div class="course-page row" v-if="course">
         <div v-if="showVideos" class="col-md-4 video-container">
            <h4 class="course-videos-header">{{ videos.length > 0 ? 'Course Videos' : 'No Videos Yet' }}</h4>

             <ListItem :key="video._id" v-for="(video, index) in videos" :name="video.title" :index="index+1"
                                @handle_delete="deleteVideo(video)"
                                @handle_click="setVideoMode(video)"
                                @handle_edit="$router.push({name: 'VideoEditor', params: {courseid: course._id, videoindex: index}})"
                                :showDeleteButton="isCourseOwner"
                                :showEditButton="isCourseOwner"
                                :selected="isVideoSelected(video)"/>

             <button v-if="isCourseOwner" class="btn btn-info col-12" @click="$router.push(`/video-editor/${course._id}`)">+ Add Video</button>
        </div>
        <div v-if="!videoMode" :class="['col-md-8', showVideos? '' : 'offset-md-2']">
            <h1>{{ course.title }}</h1>
            <h5>by {{ course.owner_name }}</h5>
            <img class="main-img" :src="course.image_url" :alt="course.title"/>
            <p>{{ course.description }}</p>
            <div class="row detail-row">
                <div class="col-2"><p>Category</p></div>  <div class="col-3"><p><b>{{ course.category }}</b></p></div>
            </div>
            <div class="row detail-row">
                <div class="col-2"><p>Enrollments</p></div>  <div class="col-3"><p><b>{{ course.enrolled_number }}</b></p></div>
            </div>
            <!-- <p>Enrolled number: <b>{{ course.enrolled_number }}</b></p> -->
            <div v-if="user">
                <div v-if="user.role==1" class="option-container">
                    <div v-if="!enrolled">
                        <button class="btn btn-primary" @click="enroll">Enroll Now</button>
                        <button class="btn btn-outline-dark">Add to Wishlist</button>
                    </div>
                    <h4 v-else>Enrolled</h4>
                </div>
                <div class="option-container" v-else-if="isCourseOwner || user.role==3">
                    <button v-if="isCourseOwner" class="btn btn-outline-dark" @click="$router.push(`/course-editor/${course._id}`)">Edit Course</button>            
                    <button class="btn btn-danger" @click="deleteCourse">Delete Course</button>
                </div>
            </div>
            <div v-else class="option-container">
                <button class="btn btn-primary" @click="$router.push('/login')">Login to Enroll</button>
            </div>
           
        </div>
        <div v-else class="col-md-8 align-self-center">
            <button class="btn btn-dark btn-sm" @click="setCourseMode"><i class="fas fa-arrow-left"></i> Back to course home</button>
            <h1>{{ `${course.title}: ${currentVideo.title}` }}</h1>
            <Video :key="currentVideo._id" :video="currentVideo"/>
        </div>   
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Video from '../components/Video'
import CourseService from '../services/CourseService'
import UserService from '../services/UserService'
import ListItem from '../components/ListItem'
import EventBus from '../common/EventBus'

export default {
    name: 'CoursePage',
    components: {
        Video,
        ListItem
    },
    data() {
        return {
            course: null,
            enrolled: false,
            videoMode: false,
            currentVideo: null,
        }
    },
    async mounted() {
        await this.$store.dispatch('loadUser')
        const courses = await CourseService.getCoursesByIds([this.$route.params.id])
        this.course = courses[0]
        await this.fetchVideos([this.course._id])
        this.enrolled = this.alreadyEnrolled()
    },
    methods: {
        async enroll() {
            try {
                UserService.enroll(this.course._id)
                this.enrolled = true
                this.course.enrolled_number++
            } catch(err) {
                EventBus.trigger('toast', err)
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
                EventBus.trigger('toast', err)
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
        async deleteVideo(video) {   
            if (confirm('Are you sure want to delete this video?')) {
                 if (this.currentVideo && this.currentVideo._id === video._id) {
                    this.setCourseMode()
                }
                this.deleteVideoStore(video._id)
            }
        },
        isVideoSelected(video) {
            return this.currentVideo && this.currentVideo._id === video._id
        },
        ...mapActions({deleteVideoStore: 'deleteVideo'}),
        ...mapActions(['fetchCourses', 'fetchVideos']),
    },
    computed: {
        isCourseOwner() {
            if (!this.user) {
                return false
            }
            return this.user.role == 2 && this.course.owner_id == this.user._id
        },
        showVideos() {
            return this.enrolled || this.isCourseOwner
        },
        
        ...mapState(['user', 'courses', 'videos'])
    }
}
</script>

<style scoped>
.course-page {
    text-align: left;
    padding: 20px 20px 60px 20px;
}
h1 {
    margin-top: 10px;
    margin-bottom: 5px;
}
.course-videos-header {
    font-size: 1.5rem;
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
.detail-row p{
    margin: 0.5rem 0; 
}
.option-container {
    margin: 2rem 0;
}
</style>