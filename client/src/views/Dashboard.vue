<template>
    <div class="dashboard">
        <div class="row" v-if="user">
            <div  class="col-lg-3 sidebar">
                <h2>{{ 'Hi, ' + fname}}</h2>
                <p>{{ user.email }}</p>
                <h4>{{ roleStr }}</h4>
            </div>
            <div class="col-lg-9 main-col">
                <h3>Your courses</h3>
                <Course :key="course.id" v-for="course in courses" :course="course"/>
                <p v-if="!courses.length">you don't have any course <router-link to="/courses">Browes courses</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Course from '../components/Course'

export default {
    name: 'Dashboard',
    components: {
        Course
    },
    data() {
        return {
            courses: []
        }
    },
    async mounted() {
        await this.$store.dispatch('loadUser')
        if (!this.authenticated) {
            this.$router.push('/')
        }
        console.log(this.user.courses)
        this.fetchUserCourses()
    },
    computed: {
        fname() {
            return this.user.name.split(' ')[0]
        },
        roleStr() {
            const roles = ['Student', 'Teacher', 'Admin']
            return roles[this.user.role - 1]
        },
        ...mapState(['user']),
        ...mapGetters(['authenticated'])
    },
    methods: {
        async fetchUserCourses() {
            for (let courseID of this.user.courses) {
                const res = await fetch(`http://localhost:5000/api/courses/${courseID}`)
                    .catch(console.log)

                if (res.status != 200) {
                    console.log('fetch error')
                    return undefined
                }
            
                const data = await res.json()
                this.courses.push(data)
            }
        }
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

    background-color: rgb(238, 192, 192);
}
.main-col {
    padding-top: 40px;
}
</style>