<template>
    <div class="dashboard">
        <div class="row" v-if="user">
            <div  class="col-lg-3 sidebar">
                <img class="profile-pic" src="@/assets/default-profile-pic.png" alt="user.name">
                <h2>{{ 'Hi, ' + fname}}</h2>
                <p>{{ user.email }}</p>
                <h4>{{ roleStr }}</h4>               
                <p v-if="user.role!==3">number of courses  {{ courses.length }}</p>
            </div>
            <div class="col-lg-9 main-col">
                <div v-if="user.role===1">
                    <h3>Enrolled courses</h3>
                    <div class="row courses">
                        <Course :key="course.id" v-for="course in courses" :course="course" :mode="'student'"/>
                    </div>
                    <p v-if="!courses.length">you don't have any course <router-link to="/courses">Browes courses</router-link></p>
                </div>

                <div v-if="user.role===2">
                     <h3>Courses by You</h3>
                     <div class="options">
                        <button class="btn btn-info" @click="$router.push('/course-editor')"><b>+</b> New</button>
                     </div>
                    <div class="row courses">
                        <Course :key="course.id" v-for="course in courses" :course="course" :mode="'teacher'"/>
                    </div>
                </div>

                <div v-if="user.role===3" class="row">
                    <div class="col-md-6">
                        <h3>Categories</h3>
                       
                        <ListItem :key="category._id" v-for="(category, index) in categories" :name="category.name" :index="index+1"
                            @handle_delete="deleteCategory(category)"
                            :showDeleteButton="true"
                            :showEditButton="false"/>

                        <div class="collapse" id="category-creator">
                            <MiniForm :items="['name']" title="New Category" @on_submit="createCategory"/>
                        </div>
                        <button class="btn btn-info col-12" data-toggle="collapse" data-target="#category-creator"
                            @click="showCategoryEditor = !showCategoryEditor">
                                {{ showCategoryEditor? 'hide' : '+ Add Cetegory' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import Course from '../components/Course'
import ListItem from '../components/ListItem'
import MiniForm from '../components/MiniForm'

import CourseService from '../services/CourseService'
import CategoryService from '../services/CategoryService'
import UserService from '../services/UserService'

export default {
    name: 'Dashboard',
    components: {
        Course,
        ListItem,
        MiniForm
    },
    data() {
        return {
            showCategoryEditor: false
        }
    },
    async mounted() {
        // await UserService.refreshToken()
        await this.$store.dispatch('loadUser')
        if (!this.user) {
            this.$router.push('/')
        }
        await this.fetchUserCourses()

        await this.fetchCategories()
    },
    computed: {
        fname() {
            return this.user.name.split(' ')[0]
        },
        roleStr() {
            const roles = ['Student', 'Teacher', 'Admin']
            return roles[this.user.role - 1]
        },
        ...mapState(['user', 'courses', 'categories']),
        ...mapGetters(['authenticated'])
    },
    methods: {
        async fetchUserCourses() {
            if (this.user.role == 1) {
                 await this.fetchStudentCourses()
            } else if (this.user.role == 2) {
               await this.fetchTeacherCourses()
            }
        },
        async fetchStudentCourses() {
            // let courseList = this.user.courses
            // this.clearCourses()
            // for (let courseID of courseList) {
            //     const res = await fetch(`http://localhost:5000/api/courses/${courseID}`)
            //         .catch(console.log)

            //     const data = await res.json()
            //     if (res.status != 200) {
            //         continue
            //     }
                
            //     console.log(data)   
            //     this.insertCourse(data)
            //     // this.courses.push(data)
            // }
            try {
                const courses = await CourseService.getCoursesByIds(this.user.courses)
                this.setCourseList(courses)
            } catch(err) {
                // Toast
            }
            // await this.fetchCourses(this.user.courses)

        },
        async fetchTeacherCourses() {
            // const res = await fetch(`http://localhost:5000/api/mycourses/${this.user._id}`, {
            //     method: "GET",
            //     mode: 'cors',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: this.$store.getters.authToken
            //     },
            //     credentials: 'include'
            // })
            
            // const data = await res.json()
            // console.log('d ' + data)
            // if (res.status !== 200) {
            //     return
            // }  
            // this.setCourseList(data)
            // // for (let course of data) {
            // //     this.courses.push(course)
            // // }
            // console.log('5 ' + this.$store.state.courses)
            // // this.courses = data
            // console.log(this.courses[0])
            try {
                const courses = await CourseService.getCoursesByOwnerId(this.user._id)
                this.setCourseList(courses)
            } catch(err) {
                // Toast
            }

        },
        // createCategory(data) {
        //     console.log(data.name)
        //     // await CategoryService.createCategory(data.name)
        // },
        // deleteCategory(category) {
        //     console.log(category)
        // },
        ...mapMutations(['setCourseList', 'clearCourses', 'insertCourse']),
        ...mapActions(['fetchCourses', 'fetchCategories', 'createCategory', 'deleteCategory'])
    }
}
</script>

<style scoped>
.dashboard {
    width: 100%;
    margin: 0 auto 0 auto;
    padding: 0;
}
.sidebar { 
    padding-top: 40px;
    min-height: 50rem;
    background-color: rgb(247, 216, 216);
}
.main-col {
    padding: 20px;
    padding-top: 40px;
}
.profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 30px;
}
.courses {
    justify-content: left;
}
.options {
    text-align: right;
    padding-right: 20px;
}
</style>