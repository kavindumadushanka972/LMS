import axios from 'axios'

const url = '/api/'


class UploadSearvice {
    static uploadImage(file) {
        return new Promise(async (resolve, reject) => {
            try {          
                const data = await this.uploadFile(file, `${url}uploadimage`)
                resolve(data)
            } catch(err) {
                reject(err)
            }
        })
    }

    static uploadVideo(file) {
        return new Promise(async (resolve, reject) => {
            try {          
                const data = await this.uploadFile(file, `${url}uploadvideo`)
                resolve(data)
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteImage(putlic_id) {
        return new Promise(async (resolve, reject) => {
            try {          
                const res = await this.post(`${url}destroyimage`, {putlic_id}, {
                    headers: {
                        Authorization: localStorage.getItem('auth')
                    }
                })
                console.log(res.data)
                resolve()
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteVideo(putlic_id) {
        return new Promise(async (resolve, reject) => {
            try {          
                const res = await this.post(`${url}destroyvideo`, {putlic_id}, {
                    headers: {
                        Authorization: localStorage.getItem('auth')
                    }
                })
                console.log(res.data)
                resolve()
            } catch(err) {
                reject(err)
            }
        })
    }


    static uploadFile(file, uploadUrl) {
        return new Promise(async (resolve, reject) => {
            try {
                const formData = new FormData()
                formData.append('file', file)
                const res = await axios.post(uploadUrl, formData,  {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem('auth')
                    }
                })
                console.log(res.data)
                resolve(res.data)
            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }
}

export default UploadSearvice