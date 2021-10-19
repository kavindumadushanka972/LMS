<template>
    <div class="video col-12">
        <vue-plyr>
        <video
            controls
            crossorigin
            playsinline
            data-poster="poster.jpg"
        >
            <source
                size="720"
                :src="video.link"
                type="video/mp4"
            />
            <source
                size="1080"
                :src="video.link"
                type="video/mp4"
            />
          
        </video>
        </vue-plyr>

        <div class="text">
            <p>{{ video.description }}</p>
            <!-- <button v-if="mode=='admin'" class="btn btn-danger delete-btn" @click="deleteVideo"><i class="far fa-trash-alt"></i></button> -->
        </div>

    </div>
</template>

<script>
import {mapActions} from 'vuex'

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
    margin: 30px auto 50px auto;
}
iframe {
    width: 100%;
}
.text {
    text-align: left;
    /* width: 70%; */
    margin-right: 0;
    margin-top: 50px;
}
.delete-button {
    float: left;
}
</style>