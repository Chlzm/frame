import 'babel-polyfill'
import App from './components/App.vue'
import store from './store'
import { currency } from './currency'
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const routes = [
    { path: '/foo', component: ProductList ,name:'foo'},
    { path: '/bar', alias:'/abcd',component:Cart}
]
const router = new VueRouter({
    routes
});
Vue.use(VueRouter);
Vue.filter('currency', currency)
new Vue({
    router,
  store,
    render:h=>h(App)
}).$mount('#app1')
