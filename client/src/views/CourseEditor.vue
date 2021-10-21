<template>
    <div class="course-editor row">
     <div class="container col-md-6" >
     <form class="form-course-editor" @submit.prevent="submit">
      <h1>i<span class="ilearn-l">L</span>earn</h1>
      <h1 class="h3 mb-3 font-weight-normal">Course Editor</h1>
      <div class="section">
        <label for="title">Title</label>
        <input type="text" class="form-control"  placeholder=""  v-model="course.title" required>
        <label for="description">Description</label>
        <textarea type="text" class="form-control" rows="10" v-model="course.description" required></textarea>
      </div>

      <div class="section">
          <label for="image">Image</label>
            <div class="custom-file">
            <input type="file" class="custom-file-input" @change="handleFileUpload" id="customFile">
            <label class="custom-file-label" for="customFile">{{ fileName ? fileName : 'Choose file' }}</label>
          </div>
          <p class="uploading-text" v-if="uploading">uploading...</p>
      </div>

      <div class="image-section section">
          <img :src="course.image_url"/>
      </div>

        <div class="form-group select-category section">
        <label for="selecteCategory">Category</label>
        <select v-model="course.category" class="form-control" aria-label="Seletect category">
          <option :key="category._id" v-for="category in categories" :value="category.name">{{ category.name }}</option>
        </select>
      </div>
              
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
import EventBus from '../common/EventBus'
import CourseService from '../services/CourseService'
import UploadService from '../services/UploadService'

export default {
  name: 'CourseEditor',
  data() {
    return {
        course: {
            title: '',
            description: '',
            category: 'maths',
            image_url: '',
            image_public_id: ''
        },
        fileName: '',
        errorMsg: '',
        uploading: false  
    }
  },
  async mounted() {
    const categoryP = this.fetchCategories()
    const userP = this.loadUser()
    await Promise.all([categoryP, userP])
    
    if (this.authenticated && this.user.role === 2) {
      if (this.$route.params.id) {
          const courses = await CourseService.getCoursesByIds([this.$route.params.id])
          this.course = courses[0]
      }
    } else {
        this.$router.push('/')
    }  
  },
  methods: {
    async submit() {
      try {
        await CourseService.updateCourse(this.course, this.$route.params.id)
        this.$router.push(this.$route.params.id ? `/course/${this.$route.params.id}`: '/dashboard') 
      } catch(err) {
        this.errMsg = err
      }
    },
    async handleFileUpload(event) {
      try {
        this.uploading = true
        this.fileName = event.target.files[0].name
        const data = await UploadService.uploadImage(event.target.files[0])
        console.log(data)
        this.course.image_url = data.url
        this.course.image_public_id = data.public_id
        this.uploading = false
      } catch(err) {
        this.uploading = true
        this.errorMsg = err
      }
    },
    ...mapActions(['loadUser', 'fetchCategories'])
  },
  computed: {
      ...mapGetters(['authenticated']),
      ...mapState(['user', 'courses', 'categories'])
  }
}
</script>

<style scoped>
.course-editor {
  width: 100%;
  padding: 0;
  margin: 0;
  padding-top: 50px;
  background-color: #A0E7E5;
  position: relative;
  top: 0;
  padding-bottom: 50px;
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
  border-radius: 10px;
}
.row {
    text-align: left;
}
.form-signin {
  width: 100%;
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
.uploading-text {
  margin-top: 20px;
}
</style>