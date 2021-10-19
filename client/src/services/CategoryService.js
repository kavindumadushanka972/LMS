import axios from "axios"

const url = "/api/category/"

class CategoryService {
    /**
     * @brief return list of category objects 
     * Pretreatment
     * @return Promise<Array<Object>> list of category objects
     */
    static getCategories() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url)
                resolve(res.data)
            
            } catch(err) {
                reject(err.response.data.msg)
            }
        })
    }

    /**
     * @brief create new category of name
     * Pretreatment
     * @param  String  name
     * @return Promise<undefined>
     */
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

    /**
     * @brief delete category 
     * Pretreatment
     * @param Object category
     * @return Promise<undefined>
     */
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