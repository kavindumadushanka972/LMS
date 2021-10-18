import axios from "axios"

const url = "/api/courses/"
const url2 = "/api/mycourses/"

class CourseService {
    static getCoursesByIds(courseIds) {
        return new Promise(async (resolve, reject) => {
            const courses = []
            // try {
                for (let id of courseIds) {
                    try {
                        const res = await axios.get(url + id)
                        courses.push(res.data)
                    } catch(err) {
                        continue
                    }                 
                }
            // } catch(err) {
            //     reject(err)
            // }

            resolve(courses)
        })
    }

    static getCoursesByOwnerId(ownerId) {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(url2 + ownerId, {
                //     method: "GET",
                //     mode: 'cors',
                //     headers: {
                //     'Content-Type': 'application/json',
                //         Authorization: localStorage.getItem('auth')
                //     },
                //     credentials: 'include'
                // })

                // const data = await res.json()
                // if (res.status !== 200) {
                //     reject(data.msg)
                // }  
               
                // resolve(data)

                const res = await axios.get(url2 + ownerId, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                }) 

                resolve(res.data)
        
            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }

    static deleteCourse(courseId) {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(url + courseId, {
                //     method: "DELETE",
                //     mode: 'cors',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         Authorization:  localStorage.getItem('auth')
                //     },
                //     credentials: 'include',
                // })
                // const data = await res.json()

                // if (res.status != 200) {
                //     reject(data.msg)
                // } 
                // resolve()

                await axios.delete(url + courseId, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:  localStorage.getItem('auth')
                    },
                })

                resolve()

            } catch (err) {
                reject(err.response.data.msg)
            }
        })
    }

    // if courseId is not given create new course
    static updateCourse(courseData, courseId) {
        return new Promise(async (resolve, reject) => {
            try {
                let url_ = url
                let method = 'POST'

                if (courseId) {
                    method = 'PUT'
                    url_ += courseId
                }

                // const res = await fetch(url_, {
                //     method: method,
                //     mode: 'cors',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         Authorization: localStorage.getItem('auth')
                //     },
                //     credentials: 'include',
                //     body: JSON.stringify({
                //         ...courseData,
                //         // image_public_id: '0'
                //     })
                // })

                // const data = await res.json()

                // if (res.status !== 200) {
                //     reject(data.msg)
                // }

                await axios({
                    url: url_,
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                    data: courseData
                })

                resolve()

            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }

    static getCoursesByQuery(query) {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(`http://localhost:5000/api/courses?${new URLSearchParams(query)}`)
                // const data = await res.json()

                // if (res.status != 200) {
                //     reject(data.msg)
                // }
                
                // resolve(data.courses)

                const res = await axios.get(url, {params: query})
                resolve(res.data.courses)



            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }
}

export default CourseService