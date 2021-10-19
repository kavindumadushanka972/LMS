<template>
    <div>
        <div class="custom-file">
            <input type="file" class="custom-file-input" @change="handleFileUpload" id="customFile">
            <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
        <p v-if="uploading"> <b>uploading...</b></p>
    </div>
</template>

<script>
export default {
    name: 'FileUpload',
    data() {
        return {
            uploading: 
        }
    },
    methods: {
        async handleFileUpload(event) {
            try {
                this.uploading = true
                const data = await UploadService.uploadImage(event.target.files[0])
                console.log(data)
                this.course.image_url = data.url
                this.course.image_public_id = data.public_id
                this.uploading = false


            } catch(err) {
                this.uploading = true
                this.errorMsg = err
            }
        },
    }
}
</script>