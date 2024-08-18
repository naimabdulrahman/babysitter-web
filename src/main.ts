import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FontAwesomeIcon from './assets/font-awesome'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register the component globally
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueSweetalert2)

app.mount('#app')
