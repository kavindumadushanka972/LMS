import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import SetupInteceptors from './services/SetupInterceptors'

SetupInteceptors.setup()

createApp(App)
.use(router)
.use(store)
.use(VuePlyr, {
    plyr: {hideYouTubeDOMError: true}
})
.mount('#app')
