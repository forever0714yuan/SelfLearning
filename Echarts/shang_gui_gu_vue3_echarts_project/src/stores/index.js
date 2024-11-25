import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            theme: 'chalk'
        }
    },
    mutations: {
        changeTheme(state) {
            if (state.theme === 'chalk') {
                state.theme = 'vintage'
            } else {
                state.theme = 'chalk'
            }
        }
    }
})

export default store