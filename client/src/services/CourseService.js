import axios from "axios"
import UploadSearvice from "./UploadService"
import UserService from "./UserService"

const url = "/api/courses/"
const url2 = "/api/mycourses/"

class CourseService {
    /**
     * @brief return list of course Objects
     * Pretreatment
     * @param  Array<Object>  courseIds
     * @return Promise<Array<Object>> list of course objects
     */
    static getCoursesByIds(courseIds) {
        return new Promise(async (resolve, reject) => {
            const courses = []
                for (let id of courseIds) {
                    try {
                        const res = await axios.get(url + id)
                        courses.push(res.data)
                    } catch(err) {
                        continue
                    }                 
                }
            resolve(courses)
        })
    }

    /**
     * @brief return list of course for given owner id
     * Pretreatment
     * @param  String ownerId
     * @return Promise<Array<Object>> list of course objects
     */
    static getCoursesByOwnerId(ownerId) {
        return new Promise(async (resolve, reject) => {
            try {
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

    /**
     * @brief delete a course with courseId
     * Pretreatment
     * @param  String courseId
     * @return Promise<undefined>
     */
    static deleteCourse(courseId) {
        return new Promise(async (resolve, reject) => {
            try {
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

   
    /**
     * @brief update course id. if courseId is not given create new course
     * Pretreatment
     * @param Object  courseData
     * @param String|undefined courseId
     * @return Promise<undefined>
     */
    static updateCourse(courseData, courseId) {
        return new Promise(async (resolve, reject) => {
            try {
                let url_ = url
                let method = 'POST'

                if (courseId) {
                    method = 'PUT'
                    url_ += courseId
                }

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


    
    /**
     * @brief return list of courses acoording to the query object
     * Pretreatment
     * @param Object  query
     * @return Promise<Array<Object>> list of course objects
     */
    static getCoursesByQuery(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url, {params: query})
                console.log(res)
                resolve(res.data.courses)

            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }
}

export default CourseService