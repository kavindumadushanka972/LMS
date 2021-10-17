<template>
    <div class="video col-12">
        <!-- <div class="text">
            <h3>{{ video.title }}</h3>
        </div> -->
        <!-- <iframe height="370" width="420" :src="video.link"></iframe> -->
       <!-- <vue-plyr>
            <div class="plyr__video-embed">
                <iframe
                :src="video.link"
                allowfullscreen
                allowtransparency
                allow="autoplay"
                ></iframe>
            </div>
        </vue-plyr> -->
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
            <button v-if="mode=='admin'" class="btn btn-danger delete-btn" @click="deleteVideo"><i class="far fa-trash-alt"></i></button>
        </div>

    </div>
</template>

<script>
import {mapActions} from 'vuex'
// import VuePlyr from 'vue-plyr'

export default {
    name: 'Video',
    props: {
        video: null,
        mode: {
            default: 'viewer',
            enum: ['viewer', 'admin']
        }
    },
    data() {
        return {
            options: {
                title: "This is an example video", 
                playsinline: true,
                volume: 10, 
                controls: ['play', 'play-small'],
                debug: false
            }
        }
    },
    methods: {
        deleteVideo() {
            if (confirm('Are you sure want to delete this video?')) {
                this.deleteVideoStore(this.video._id)
            }
        },
        ...mapActions({deleteVideoStore: 'deleteVideo'})
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
    /* height: 30rem; */
}
.text {
    text-align: left;
    /* width: 70%; */
    margin-right: 0;
    margin-top: 50px;
    /* display: inline-block; */
}
.delete-button {
    float: left;
}
</style>