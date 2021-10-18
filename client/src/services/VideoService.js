import axios from 'axios'

const url = '/api/videos/'

class VideoService {
    static getVideosByCourseId(courseId) {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(`${url}${courseId}`, {
                //     method: "GET",
                //     mode: 'cors',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         Authorization: localStorage.getItem('auth')
                //     },
                //     credentials: 'include',
                // })

                // const data = await res.json()
                // if (res.status != 200) {
                //     reject(data.msg)
                // } 
                
                // resolve(data)

                const res = await axios.get(`${url}${courseId}`)
                resolve(res.data)

            } catch(err) {
                reject(err)
            }
        })
    }

    static createVideo(videoData, courseId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${url}${courseId}`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:  localStorage.getItem('auth')
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ...videoData,
                        public_id: '0',
                        
                    })
                })
                const data = await res.json()
        
                if (res.status !== 200) {
                  reject(data.msg)
                }
                
                resolve()
        
              } catch(err) {
                reject(err)
              }
        })
    }

    static deleteVideo(videoId) {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(`${url}${videoId}`, {
                //     method: "DELETE",
                //     mode: 'cors',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         Authorization: localStorage.getItem('auth')
                //     },
                //     credentials: 'include',
                // })

                // const data = await res.json()
                // if (res.status != 200) {
                //     reject(data.msg)
                // } 
                // resolve()

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