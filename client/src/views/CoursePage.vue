<template>
    <div class="container">
        <h1>{{ course.title }}</h1>
        <img class="main-img" :src="course.image_url" :alt="course.title"/>
        <p>{{ course.description }}</p>
        <button class="btn btn-primary">Enroll Now</button>
        <button class="btn btn-outline-dark">Add to Wishlist</button>
    </div>
</template>

<script>
export default {
    name: 'CoursePage',
    data() {
        return {
            course: {title: ''}
        }
    },
    async created() {
       this.course = await this.fetchCourse()
    },
    methods: {
        async fetchCourse() {
            const res = await fetch(`http://localhost:5000/api/courses/${this.$route.params.id}`)

            if (res.status != 200) {
                console.log('fetch error')
                return undefined
            }
        
            const data = await res.json()
            return data
        }
    }
}
</script>

<style scoped>
.container {
    padding-left: 10%;
    padding-right: 10%;
    text-align: left;
}
h1 {
    margin-bottom: 40px;
}
.main-img {
    width: 100%;
}
p {
    margin-top: 50px;
    margin-bottom: 50px;
}
.btn {
    margin-right: 10px;
}
</style>