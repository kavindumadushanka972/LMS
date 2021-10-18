import axios from "axios"

const url = '/api/user/'

class UserService {
    // get authenticated user
    static getUser() {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(url + `infor`, {
                //     method: "GET",
                //     mode: 'cors',
                //     headers: {
                //     'Content-Type': 'application/json',
                //     Authorization: localStorage.getItem('auth')
                //     },
                //     credentials: 'include',
                // })
                // const data = await res.json()

                // if (res.status !== 200) {
                //     reject(data.msg)
                // }

                // resolve(data)
                console.log('getuser')
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

    static login(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(url + 'login', {
                //     method: "POST",
                //     mode: 'cors',
                //     headers: {'Content-Type': 'application/json'},
                //     credentials: 'include',
                //     body: JSON.stringify({email: email, password: password})
                // })
                // const data = await res.json()

                // if (res.status !== 200) {
                //    reject(data.msg)
                // }

                // localStorage.auth = data
                // resolve()
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

    static logout() {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(url + 'logout', {
                //     method: "POST",
                //     mode: 'cors',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         // 'Authorization': localStorage.getItem('auth')
                //     },
                //     credentials: 'include',
                //     body: ''
                // })
                // const data = await res.json()
                // console.log('logging out')

                // if (res.status !== 200) {
                //     reject(data.msg)
                // }
                // localStorage.removeItem('auth')
                // resolve(data)

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

    static register(userData) {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(url + 'register', {
                //     method: "POST",
                //     mode: 'cors',
                //     headers: {'Content-Type': 'application/json'},
                //     credentials: 'include',
                //     body: JSON.stringify({
                //         name: userData.fname + ' ' + userData.lname,
                //         email: userData.email, 
                //         password: userData.password,
                //         passwordConf: userData.passwordConf,
                //         role: parseInt(userData.role)
                //     })
                // })
                // const data = await res.json()

                // if (res.status !== 200) {
                //     reject(data.msg)
                // }

                // localStorage.setItem('auth', data)
                // resolve()


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

    static enroll(newCourse) {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(url + 'enroll', {
                //     method: "PATCH",
                //     mode: 'cors',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         Authorization: localStorage.getItem('auth')
                //     },
                //     credentials: 'include',
                //     body: JSON.stringify({course: newCourse})
                // })
                
                // const data = await res.json()

                // if (res.status != 200) {
                //     reject(data.msg)
                // } 

                // resolve()

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

    static refreshToken() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + 'refresh_token',{
                    withCredentials: true
                })
                localStorage.setItem('auth', res.data.accesstoken)
                // console.log(res.data.accesstoken)
                resolve(res.data.accesstoken)

            } catch(err) {
                console.log(err.response)
                reject(err.response.data.msg)
            }
        })
    }
}

export default UserService