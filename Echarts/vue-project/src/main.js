import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import axios from 'axios'
const app = createApp(App)

// import dayjs from 'dayjs';
// import $ from 'jquery'
// app.config.globalProperties.$ = $;

// export default {
//     install(app) {
//         app.config.globalProperties.formDate = function (value, fmtRules) {
//             return dayjs(value).format(fmtRules)
//         }
//     }
// }
app.config.globalProperties.axios = axios;

app.use(createPinia())
app.use(router)

app.mount('#app')
