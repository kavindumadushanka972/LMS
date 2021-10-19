<template>
    <div class="courses">
        <h1>Find Courses of Your Dreams</h1>
       
        <CourseSearch @do_search="search"/>
        <h4 v-if="courses.length == 0" style="text-align: center">No course found</h4>
        <div class="row">
            <Course :key="course.id" v-for="course in courses" :course="course" :mode="'common'"/>
        </div>
        <div class="bottom-control">
            <button :disabled="page <= 1" class="btn btn-dark" @click="prevPage"><i class="fas fa-arrow-left"></i></button>
            <p>Page {{ page }}</p>
            <button :disabled="!showNextButton" class="btn btn-dark" @click="nextPage"><i class="fas fa-arrow-right"></i></button>
        </div>      
    </div>
</template>

<script>
import EventBus from '../common/EventBus'
import Course from '../components/Course'
import CourseSearch from '../components/CourseSearch'
import CourseService from '../services/CourseService'

export default {
    name: 'Courses',
    components: {
        Course,
        CourseSearch
    },
    data() {
        return {
            courses: [],
            couseView: false,
            page: 1,
            category: 'all'
        }
    },
    async mounted() {
        if (this.$route.query.page) {   // if currently has a page ?
            this.page = parseInt(this.$route.query.page)
            
        } else {
            this.page = 1
        }
        this.courses = await CourseService.getCoursesByQuery(this.$route.query)
    },
    methods: {
        async nextPage() {  // increment the page number 
            this.page++
            this.$router.push({query: {page: this.page}})
            await this.switchPage()
        },
        async prevPage() {  // decreament the page number 
            this.page--
            this.$router.push({query: {page: this.page}})
            this.switchPage()
        },
        async switchPage() {
            try {
                this.courses = await CourseService.getCoursesByQuery({page: this.page})
            } catch(err) {
                EventBus.trigger('toast', err)
            }
        },
        async search(searchData) {  // search based on search querys form
            const query = {
                'title[regex]': searchData.keyword, // search keyword
                sort: searchData.sort
            }
            if (searchData.category !== '') {
                query.category = searchData.category
            }
            this.$router.push({query: query})
            this.courses = await CourseService.getCoursesByQuery(query)
        }      
    },
    computed: {
        showNextButton() {
            return this.courses.length > 0 && this.courses.length == 9
        }
    }
}
</script>

<style scoped>
h1 {
    font-weight: 400;
}
.courses {
    text-align: left;
    padding: 15px;
    margin: 20px;
    width: 100%;
}
.row {
    width: 100%;
}
.row {
    margin: 30px auto 0 auto;
}
.bottom-control {
    text-align: center;
}
.bottom-control p {
    display: inline;
    margin: 30px;
}
</style>