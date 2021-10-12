<template>
    <div class="course col-lg-4 col-md-4 col-sm-6">
        <img :src="course.image_url" :alt="course.title"/>
        <!-- <div class="course-img"></div> -->
        <h4>{{ course.title }}</h4>
        <p>{{ course.description }}</p>
    </div>
</template>

<script>
export default {
    name: 'Course',
    props: {
        course: Object
    }
}
</script>

<style scoped>
.course {
    text-align: left;
}
.course-img {
    width: 100%;
    height: 100px;
    background-color: cornflowerblue;
}
h4 {
    font-weight: 600;
    margin-bottom: 2px;
}
img {
    width:inherit
}
</style>