import Vue from 'vue'
import Router from 'vue-router'
import Foo from './components/Foo.vue'
import Bar from './components/Bar.vue'
import Baz from './components/Baz.vue'
Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: Foo },
            { path: '/foo', component: Foo },
            { path: '/bar', component: Bar },
            { path: '/baz', component: Baz },
        ]
    })
}