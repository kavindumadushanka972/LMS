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
import EventBus from '../common/EventBus'

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
        await this.$store.dispatch('loadUser')
        if (!this.user) {
            this.$router.push('/')
        }
        await this.fetchUserCourses()

        await this.fetchCategories()
    },
    computed: {
        fname() {   // first name
            return this.user.name.split(' ')[0]
        },
        roleStr() { // return the role as a string
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
        async fetchStudentCourses() {   // student courses from user.courses
            try {
                const courses = await CourseService.getCoursesByIds(this.user.courses)
                this.setCourseList(courses)
            } catch(err) {
                EventBus.trigger('toast', err)
            }
        },
        async fetchTeacherCourses() {   // teacher courses by teacher id
            try {
                const courses = await CourseService.getCoursesByOwnerId(this.user._id)
                this.setCourseList(courses)
            } catch(err) {
                EventBus.trigger('toast', err)
            }

        },
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