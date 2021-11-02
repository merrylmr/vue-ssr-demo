import Vue from 'vue';
import App from './App.vue';
import {createRouter} from './router'
import {createStore} from './store'
import {sync} from 'vuex-router-sync'

const router = createRouter();
const store = createStore()
sync(store, router)

export function createApp(context) {
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return {app, router, store}
}