import axios from 'axios'
import UserService from './UserService'
import EventBus from '../common/EventBus'

class SetupInterceptors {
    static setup() {
        axios.interceptors.response.use(
            (res) =>{
                return res
            }, 
            async (err) => {
                const originalConfig = err.config
                if (err.response && err.response.status === 400 &&
                     originalConfig.url !== '/api/user/refresh_token' && 
                     originalConfig.url !== '/api/user/login' ) {

                    console.log('intercept erro ' + originalConfig.url + ' ' + err.response.status)
                
                    if (!originalConfig._retry) {
                        originalConfig._retry = true
                        try {
                            const token = await UserService.refreshToken()
                            originalConfig.headers.Authorization = token
                            return axios(originalConfig)
    
                        } catch(err) {
                            console.log(err)
                            EventBus.trigger('logout')
                            return Promise.reject(err)
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