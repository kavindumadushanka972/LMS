const url = 'http://localhost:5000/user/'

class UserService {
    // get authenticated user
    static getUser() {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('auth')
            if (!token) {
                reject('not authenticated')
            }

            try {
                const res = await fetch(url + `infor`, {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                    },
                    credentials: 'include',
                })
                const data = await res.json()

                if (res.status !== 200) {
                    reject(data.msg)
                }

                resolve(data)

            } catch (err) {
                reject(err)
            }
        })
    }

    static login(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(url + 'login', {
                    method: "POST",
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({email: email, password: password})
                })
                const data = await res.json()

                if (res.status !== 200) {
                   reject(data.msg)
                }

                localStorage.auth = data
                resolve('done')

            } catch(err) {
                reject(err)
            }
        })
    }

    static logout() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(url + 'logout', {
                    method: "POST",
                    mode: 'cors',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('auth')},
                    credentials: 'include',
                    body: ''
                })
                const data = await res.json()

                if (res.status !== 200) {
                    reject(data.msg)
                }

                localStorage.removeItem('auth')
                resolve(data)

            } catch(err) {
                reject(err)
            }
        })
    }

    static register(userData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(url + 'register', {
                    method: "POST",
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({
                        name: userData.fname + ' ' + userData.lname,
                        email: userData.email, 
                        password: userData.password,
                        passwordConf: userData.passwordConf,
                        role: parseInt(userData.role)
                    })
                })
                const data = await res.json()

                if (res.status !== 200) {
                    reject(data.msg)
                }

                localStorage.setItem('auth', data)
                resolve()

            } catch(err) {
                reject(err)
            }
        })
    }

    static enroll(newCourse) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(url + 'enroll', {
                    method: "PATCH",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
                    credentials: 'include',
                    body: JSON.stringify({course: newCourse})
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
}

export default UserService