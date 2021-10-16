<template>
    <div class="video col-12">
        <iframe height="370" width="420" :src="video.link"></iframe>
        <div class="text">
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
            <button v-if="mode=='admin'" class="btn btn-danger delete-btn" @click="deleteVideo"><i class="far fa-trash-alt"></i></button>
        </div>

    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Video',
    props: {
        video: null,
        mode: {
            default: 'viewer',
            enum: ['viewer', 'admin']
        }
    },
    methods: {
        deleteVideo() {
            if (confirm('Are you sure want to delete this video?')) {
                this.deleteVideoStore(this.video._id)
            }
        },
        ...mapActions({deleteVideoStore: 'deleteCourse'})
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
    /* height: 20rem; */
}
.text {
    text-align: left;
    width: 70%;
    margin-right: 0;
    /* display: inline-block; */
}
.delete-button {
    float: left;
}
</style>