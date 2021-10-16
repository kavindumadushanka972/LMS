
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
            <label for="imageURL">Image URL</label>
            <input type="text" class="form-control" placeholder="" v-model="course.image_url" required>
        </div>

        <div class="image-section section">
            <img :src="course.image_url"/>
        </div>

         <div class="form-group select-category section">
          <label for="selecteCategory">Category</label>
          <select v-model="course.category" class="form-control" aria-label="Seletect category">
            <option selected value="maths">Math</option>
            <option value="programming">Programming</option>
            <option value="multimedia">Multimedia</option>
            <option value="english">English</option>
            <option value="other">Other</option>
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

export default {
  name: 'CourseEditor',
  data() {
    return {
        course: {
            title: '',
            description: '',
            category: 'maths',
            image_url: '',
        },
        errorMsg: ''     
    }
  },
  async mounted() {
      if (this.$route.params.id) {
          await this.fetchCourses([this.$route.params.id])
          this.course = this.courses[0]
      }
      await this.loadUser()
      if (this.authenticated && this.user.role === 2) {

      } else {
          this.$router.push('/')
      }
  },
  methods: {
    async submit() {
      try {
        let method = 'POST'
        let url = 'http://localhost:5000/api/courses'
        if (this.$route.params.id) {
            method = 'PUT'
            url += '/' + this.$route.params.id
        }
        const res = await fetch(url, {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.$store.getters.authToken
            },
            credentials: 'include',
            body: JSON.stringify({
                ...this.course,
                image_public_id: '0',
                
            })
        })
        const data = await res.json()
        console.log(data)

        if (res.status !== 200) {
          this.errorMsg = data.msg
          return
        }
        this.errorMsg = ''
        this.$router.push('/')

      } catch(err) {
        this.errorMsg = err
      }
    },
  
    ...mapActions(['loadUser', 'fetchCourses'])
  },
  computed: {
      ...mapGetters(['authenticated']),
      ...mapState(['user', 'courses'])
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

}
.section {
    margin-top: 40px;
}
.image-section {
    text-align: center;
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
</style>