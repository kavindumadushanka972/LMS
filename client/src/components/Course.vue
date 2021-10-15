<template>
    <div :class="['course', 'align-self-left', mode=='common'?'col-lg-3 col-md-4 col-sm-6':'col-md-4']">
        <img :src="course.image_url" @click="$router.push(`/course/${course._id}`)" :alt="course.title"/>
        <h4 @click="$router.push(`/course/${course._id}`)">{{ course.title }}</h4>
        <p>by {{ course.owner_name }}</p>
        <div v-if="mode === 'teacher'">
            <button class="btn btn-outline-dark" @click="$router.push(`/course-editor/${course._id}`)">Edit</button>
            <button class="btn btn-danger" @click="deleteCourse"><i class="far fa-trash-alt"></i></button>

        </div>
        <!-- <div v-else-if="mode === 'student'">
            <button class="btn btn-outline-dark">Unenroll</button>
        </div> -->
            
    </div>
</template>

<script>
export default {
    name: 'Course',
    props: {
        course: Object,
        mode: {
            default: 'common',
            enum: ['teacher', 'student', 'common']
        }
    },
    methods: {
        deleteCourse() {
            this.$store.dispatch('deleteCourse', this.course._id)
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
 .course {
    text-align: left;
    margin-bottom: 30px;
    padding: 10px 25px;
} 
h4 {
    font-weight: 600;
    margin-bottom: 2px;
    cursor: pointer;
    font-size: 1.2rem;
}
img {
    width:inherit;
    cursor: pointer;
    height: 10rem;
    object-fit: cover;
}
.btn {
    font-size: 0.9rem;
    margin-right: 10px;
    padding: 5px 10px;
}
p {
    margin-bottom: 5px;
}
</style>