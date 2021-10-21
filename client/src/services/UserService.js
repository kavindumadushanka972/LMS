import axios from "axios"

const url = '/api/user/'

class UserService {
      /**
     * @brief return authenticated user
     * Pretreatment
     * @return Promise<Object>
     */
    static getUser() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + 'infor', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                })

                resolve(res.data)

            } catch (err) {
                reject(err.response.data.msg)
            }
        })
    }

    /**
     * @brief login
     * Pretreatment
     * @param string email
     * @param String passwoard
     * @return Promise<undefined>
     */
    static login(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url + 'login', {email, password}, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                })

                localStorage.setItem('auth', res.data)
                resolve()

            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }

    /**
     * @brief logout
     * Pretreatment
     * @return Promise<undefined>
     */
    static logout() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url + 'logout', {}, {
                    headers: {
                        'Authorization': localStorage.getItem('auth')
                    }
                })

                localStorage.removeItem('auth')
                resolve()

            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }

    /**
     * @brief register new user
     * Pretreatment
     * @param  Object userData
     * @return Promise<undefined>
     */
    static register(userData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url + 'register', {
                    name: userData.fname + ' ' + userData.lname,
                    email: userData.email, 
                    password: userData.password,
                    passwordConf: userData.passwordConf,
                    role: parseInt(userData.role)
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                
                localStorage.setItem('auth', res.data)
                resolve()

            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }

    /**
     * @brief enroll student to a given course. student only
     * Pretreatment
     * @param  Object newCourse
     * @return Promise<undefined>
     */
    static enroll(newCourse) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.patch(url + 'enroll', {course: newCourse}, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    }
                })

                resolve()

            } catch (err) {
                reject(err.response.data.msg)
            }
        })

    }

    /**
     * @brief refresh acces token, store it in local storage, return acces token
     * Pretreatment
     * @return Promise<String>
     */
    static refreshToken() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + 'refresh_token',{
                    withCredentials: true,
                })
                localStorage.setItem('auth', res.data.accesstoken)
                // console.log(res.data.accesstoken)
                resolve(res.data.accesstoken)

            } catch(err) {
                reject(err)
            }
        })
    }
}

export default UserService