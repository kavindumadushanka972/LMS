import axios from 'axios'
import { reject } from 'bcrypt/promises'
import UserService from './UserService'

class SetupInterceptors {
    static setup() {
        axios.interceptors.response.use(
            (res) =>{
                return res
            }, 
            async (err) => {
                const originalConfig = err.config
                console.log('intercept erro ' + originalConfig.url)
                if (err.response && err.response.status === 400 ) {
                
                    // const token = localStorage.getItem('auth')
                    // originalConfig.headers.Authorization = token
    
                    if (!originalConfig._retry) {
                        originalConfig._retry = true
                        try {
                            await UserService.refreshToken()
                            // originalConfig.headers.Authorization = token
                            return axios(originalConfig)
    
                        } catch(err) {
                            console.log(err)
                            return Promise.reject('refresh token expired/invalid. login required')
                        }
                       
                    } else {
                        await UserService.logout()
                        return Promise.reject('invalid athentication. login required')
                    }
                }

               return Promise.reject(err)
            }
        )
    }
}

export default SetupInterceptors