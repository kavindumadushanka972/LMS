import axios from "axios"

const url = "/api/category/"

class CategoryService {
    static getCategories() {
        return new Promise(async (resolve, reject) => {
            try {
                // const res = await fetch(url, {
                //     method: "GET",
                //     mode: 'cors',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         Authorization: localStorage.getItem('auth')
                //     },
                // })

                // const data = await res.json()
                // if (res.status !== 200) {
                //     reject(data.msg)
                // } 

                const res = await axios.get(url)
                resolve(res.data)
            
            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }

    static createCategory(name) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post(url, {name}, {
                    headers: {
                            'Content-Type': 'application/json',
                            Authorization: localStorage.getItem('auth')
                        },
                })
                resolve()
            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }

    static deleteCategory(category) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.delete(url + category._id, {
                    headers: {
                            Authorization: localStorage.getItem('auth')
                        },
                })
                resolve()
            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }
}

export default CategoryService