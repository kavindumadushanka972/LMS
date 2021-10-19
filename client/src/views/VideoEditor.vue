
<template>
      <div class="editor row">
     <div class="container col-md-6" >
     <form class="form-course-editor" @submit.prevent="submit">
      <h1>i<span class="ilearn-l">L</span>earn</h1>
      <h1 class="h3 mb-3 font-weight-normal">Video Editor</h1>
      <div class="section">
        <label for="title">Title</label>
        <input type="text" class="form-control"  placeholder=""  v-model="video.title" required>
        <label for="description">Description</label>
        <textarea type="text" class="form-control" rows="10" v-model="video.description" required></textarea>
      </div>

        <!-- <div class="section">
            <label for="URL">Embed Link</label>
            <input type="text" class="form-control" placeholder="" v-model="video.link" required>
        </div> -->

         <div class="section file-section">
            <label for="Video">Video</label>
             <div class="custom-file">
              <input type="file" class="custom-file-input" @change="handleFileUpload" id="customFile">
              <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
            <p v-if="uploading"> <b>uploading...</b></p>
        </div>

        

        <!-- <div v-if="video.link !== ''" class="preview section">
           <Video :video="video"/>
        </div> -->
        <div class="section">
            <p v-if="errorMsg != ''">{{ errorMsg }}</p>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Save</button>
        </div>
    </form>
     </div>
     </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import Video from '../components/Video'
import UploadService from '../services/UploadService'
import VideoService from '../services/VideoService'

export default {
  name: 'VideoEditor',
  components: {
      Video
  },
  data() {
    return {
        video: {
            title: '',
            description: '',
            link: '',
            public_id: ''
        },
        videoIndex: 0,
        edit: false,
        errorMsg: '' ,
        uploading: false    
    }
  },
  async mounted() {
      await this.loadUser()

      if (typeof this.$route.params.videoindex === 'string') {
        this.edit = true
        this.videoIndex = parseInt(this.$route.params.videoindex)
        await this.fetchVideos(this.$route.params.courseid)
        console.log(this.videos)
        this.video = this.videos[this.videoIndex]
      }
      console.log('string') 
      if (this.$route.params.id) {
          await this.fetchCourses([this.$route.params.id])
      }
      
      if (this.authenticated && this.user.role === 2) {

      } else {
          this.$router.push('/')
      }
  },
  methods: {
    async submit() {
      try {
        if (!this.edit) {
          await VideoService.createVideo(this.video, this.$route.params.courseid)
        } else {
          await VideoService.updateVideo(this.video)
        }
        this.$router.push(`/course/${this.$route.params.courseid}`)
        
      } catch(err) {
        this.errorMsg = err
        console.log(err)
      }
    },
    async handleFileUpload(event) {
      try {
        this.uploading = true
        const data = await UploadService.uploadVideo(event.target.files[0])
        console.log(data)
        this.video.link = data.url
        this.video.public_id = data.public_id
        this.uploading = false

      } catch(err) {
        this.uploading = false
        this.errorMsg = err
      }
    },
  
    ...mapActions(['loadUser', 'fetchCourses', 'fetchVideos'])
  },
  computed: {
      ...mapGetters(['authenticated', 'authToken']),
      ...mapState(['user', 'courses', 'videos'])
  }
}
</script>

<style scoped>
.editor {
  width: 100%;
  padding: 0;
  margin: 0;
  padding-top: 50px;
  background-color: #A0E7E5;
  position: relative;
  top: 0;
}
.section {
    margin-top: 40px;
}
.image-section {
    text-align: center;
}
img {
  width: 90%;
}
.container {
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border: 1px solid  #e6e3e3;
  background-color: white;
}


.row {
    text-align: left;
}

.form-signin {
  width: 100%;
  /* max-width: 330px; */
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.select-category {
  margin-bottom: 100px;
}
label {
    margin-top: 40px;
    margin-bottom: 5px;
    font-weight: 600;
}
.custom-file-label {
  font-weight: 400;
  margin-top: 10px;
}
.file-section {
  margin-bottom: 50px;
}

</style>