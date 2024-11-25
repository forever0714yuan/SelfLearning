import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import stores from './stores/index';
import './assets/gloable.less'
import './assets/font/iconfont.css'
import SocketService from './utils/socket_service';

// console.log(SocketService.Instance);
SocketService.Instance.connect();

const app = createApp(App);
// export { EChartsFullOption as EChartsOption, connect, disConnect, dispose, getInstanceByDom, getInstanceById, getMap, init, registerLocale, registerMap, registerTheme };



// app.use(createPinia());
app.use(router);
app.use(stores);

app.mount('#app');
