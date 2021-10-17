const url = "http://localhost:5000/api/category/"

class CategoryService {
    static getCategories() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(url, {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('auth')
                    },
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
}

export default CategoryService