import axios from 'axios'

const url = '/api/'


class UploadSearvice {
    /**
     * @brief upload image. return {public_id, link}
     * Pretreatment
     * @param  Object   file
     * @return Promise<Object>
     */
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

   /**
     * @brief upload video. return {public_id, link}
     * Pretreatment
     * @param  Object   file
     * @return Promise<Object>
     */
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

    /**
     * @brief delete image.
     * Pretreatment
     * @param  string public_id
     * @return Promise<undefined>
     */
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


    /**
     * @brief delete video
     * Pretreatment
     * @param  string public_id
     * @return Promise<undefined>
     */
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

  /**
     * @brief upload any file. return {public_id, link}
     * Pretreatment
     * @param Object file
     * @param String uploadUrl
     * @return Promise<Object>
     */
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