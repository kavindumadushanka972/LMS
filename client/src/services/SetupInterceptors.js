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
                if (err.response && err.response.status === 400 && originalConfig.url !== '/api/user/refresh_token' ) {
                    console.log('intercept erro ' + originalConfig.url + ' ' + err.response.status)
                
                    // const token = localStorage.getItem('auth')
                    // originalConfig.headers.Authorization = token
    
                    if (!originalConfig._retry) {
                        originalConfig._retry = true
                        try {
                            const token = await UserService.refreshToken()
                            originalConfig.headers.Authorization = token
                            return axios(originalConfig)
    
                        } catch(err) {
                            console.log(err)
                            await UserService.logout()
                            return Promise.reject('refresh token expired/invalid. login required')
                        }
                       
                    } else {        
                        return Promise.reject(err)
                    }
                }

               return Promise.reject(err)
            }
        )
    }
}

export default SetupInterceptors