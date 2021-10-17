import axios from 'axios'

const url = 'http://localhost:5000/api/'
// const url = 'http://localhost:4500/'

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

                resolve(res.data)
            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }
}

export default UploadSearvice