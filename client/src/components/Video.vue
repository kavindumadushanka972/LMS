<template>
    <div class="video col-12">
        <iframe :src="video.link"></iframe>
        <div class="text">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Video',
    props: {
        video: null
    }
}
</script>

<style scoped>
.video {
    text-align: center;
    padding: 0;
    margin: 30px auto 30px auto;
}
iframe {
    width: 100%;
    height: 20rem;
}
.text {
    text-align: left;
}
</style>