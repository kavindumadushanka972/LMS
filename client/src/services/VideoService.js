const url = 'http://localhost:5000/api/videos/'

class VideoService {
    static getVideosByCourseId(courseId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${url}${courseId}`, {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                    credentials: 'include',
                })

                const data = await res.json()
                if (res.status != 200) {
                    reject(data.msg)
                } 
                
                resolve(data)

            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteVideo(videoId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${url}${videoId}`, {
                    method: "DELETE",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                    credentials: 'include',
                })

                const data = await res.json()
                if (res.status != 200) {
                    reject(data.msg)
                } 
                resolve()

            } catch(err) {
                reject(err)
            }
        })
    }
}

export default VideoService