
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
        errorMsg: '' ,
        uploading: false    
    }
  },
  async mounted() {
      if (this.$route.params.id) {
          await this.fetchCourses([this.$route.params.id])
          // this.course = this.courses[0]
      }
      await this.loadUser()
      if (this.authenticated && this.user.role === 2) {

      } else {
          this.$router.push('/')
      }
  },
  methods: {
    async submit() {
      // try {
      //   let method = 'POST'
      //   let url = `http://localhost:5000/api/videos/${this.$route.params.courseid}`
      //   // if (this.$route.params.id) {
      //   //     method = 'PUT'
      //   //     url += '/' + this.$route.params.id
      //   // }
      //   const res = await fetch(url, {
      //       method: method,
      //       mode: 'cors',
      //       headers: {
      //           'Content-Type': 'application/json',
      //           Authorization: this.authToken
      //       },
      //       credentials: 'include',
      //       body: JSON.stringify({
      //           ...this.video,
      //           public_id: '0',
                
      //       })
      //   })
      //   const data = await res.json()
      //   console.log(data)

      //   if (res.status !== 200) {
      //     this.errorMsg = data.msg
      //     return
      //   }
      //   this.errorMsg = ''
      //   this.$router.push('/')

      // } catch(err) {
      //   this.errorMsg = err
      // }

      try {
        await VideoService.createVideo(this.video, this.$route.params.courseid)
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
  
    ...mapActions(['loadUser', 'fetchCourses'])
  },
  computed: {
      ...mapGetters(['authenticated', 'authToken']),
      ...mapState(['user', 'courses'])
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
  /* display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center; */
  align-items: center;
  /* -webkit-box-pack: center; */
  justify-content: center;
  padding: 40px 20px;
  /* padding-top: 40px;
  padding-bottom: 40px; */
  /* background-color: #f5f5f5; */
  /* width: 50%; */
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