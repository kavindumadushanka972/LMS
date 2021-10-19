import axios from 'axios'

const url = '/api/videos/'

class VideoService {
    /**
     * @brief return list of videos of given id 
     * Pretreatment
     * @param  String  courseId
     * @return Promise<Array> list of video objects
     */
    static getVideosByCourseId(courseId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}${courseId}`)
                resolve(res.data)

            } catch(err) {
                reject(err)
            }
        })
    }

    /**
     * @brief create new video 
     * Pretreatment
     * @param  Object   videoData
     * @param  String   courseId
     * @return Promise<undefind> 
     */
    static createVideo(videoData, courseId) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post(`${url}${courseId}`, videoData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:  localStorage.getItem('auth')
                    },
                })

                resolve()
        
              } catch(err) {
                reject(err.response.data.msg)
              }
        })
    }

    /**
     * @brief edit existing video
     * Pretreatment
     * @param  Object   videoData
     * @return Promise<undefind> 
     */
    static updateVideo(videoData) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.put(`${url}${videoData._id}`, videoData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                })
                resolve()

            } catch(err) {
                console.log(err)
                reject(err.response.data.msg)
            }
        })
    }

    /**
     * @brief delete existing video
     * Pretreatment
     * @param  String   videoId
     * @return Promise<undefind>
     */
    static deleteVideo(videoId) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.delete(`${url}${videoId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                })

                resolve()

            } catch(err) {
                reject(err.resoponse.data.msg)
            }
        })
    }
}

export default VideoService