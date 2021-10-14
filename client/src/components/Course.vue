<template>
    <div :class="['container', full?'col-6':'col-lg-3 col-md-4 col-sm-6']">
        <img :src="course.image_url" @click="$router.push(`/course/${course._id}`)" :alt="course.title"/>
        <h4 @click="$router.push(`/course/${course._id}`)">{{ course.title }}</h4>
        <p>by {{ course.owner_name }}</p>
    </div>
</template>

<script>
export default {
    name: 'Course',
    props: {
        course: Object,
        full: false,
        mode: {
            enum: ['teacher', 'student', 'common']
        }
    }
}
</script>

<style scoped>
.container {
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
}
</style>