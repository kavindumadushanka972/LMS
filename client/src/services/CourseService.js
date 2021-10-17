const url = "http://localhost:5000/api/courses/"
const url2 = "http://localhost:5000/api/mycourses/"

class CourseService {
    static getCoursesByIds(courseIds) {
        return new Promise(async (resolve, reject) => {
            const courses = []
            try {
                for (let id of courseIds) {
                    const res = await fetch(url + id)
                    const data = await res.json()

                    if (res.status !== 200) {
                        continue
                    }

                    courses.push(data)
                }
            } catch(err) {
                reject(err)
            }

            resolve(courses)
        })
    }

    static getCoursesByOwnerId(ownerId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(url2 + ownerId, {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                    'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                    credentials: 'include'
                })

                const data = await res.json()
                if (res.status !== 200) {
                    reject(data.msg)
                }  
               
                resolve(data)
        
            } catch(err) {
                reject(err)
            }
        })
    }

    static deleteCourse(courseId) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(url + courseId, {
                    method: "DELETE",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:  localStorage.getItem('auth')
                    },
                    credentials: 'include',
                })
                const data = await res.json()

                if (res.status != 200) {
                    reject(data.msg)
                } 
                resolve()

            } catch (err) {
                reject(err)
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

                const res = await fetch(url_, {
                    method: method,
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ...courseData,
                        // image_public_id: '0'
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

    static getCoursesByQuery(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`http://localhost:5000/api/courses?${new URLSearchParams(query)}`)
                const data = await res.json()

                if (res.status != 200) {
                    reject(data.msg)
                }
                
                resolve(data.courses)

            } catch(err) {
                reject(err)
            }
        })
    }
}

export default CourseService