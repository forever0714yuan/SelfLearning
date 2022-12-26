import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/gloable.less'
import './assets/font/iconfont.css'
const app = createApp(App);
// export { EChartsFullOption as EChartsOption, connect, disConnect, dispose, getInstanceByDom, getInstanceById, getMap, init, registerLocale, registerMap, registerTheme };



app.use(createPinia());
app.use(router);

app.mount('#app');
