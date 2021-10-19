import axios from 'axios'
import UserService from './UserService'
import EventBus from '../common/EventBus'

class SetupInterceptors {
    static setup() {
        axios.interceptors.response.use(
            (res) =>{
                return res
            }, 
            // this function will handel authetication realted errors
            async (err) => {
                const originalConfig = err.config

                // do not consider /refresh_token /login
                if (err.response && err.response.status === 400 &&
                     originalConfig.url !== '/api/user/refresh_token' && 
                     originalConfig.url !== '/api/user/login' ) {
                    
                    // turn on _retry flag if it is not 
                    if (!originalConfig._retry) {
                        originalConfig._retry = true
                        try {
                            const token = await UserService.refreshToken()  // refresh token
                            originalConfig.headers.Authorization = token    // now _rety = true
                            return axios(originalConfig)
    
                        } catch(err) {  // do not loop
                            console.log(err)
                            EventBus.trigger('logout')  // triger logout if refresh token failed
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