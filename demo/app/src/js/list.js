import Vue from 'vue';
import VueRouter from 'vue-router'
import Fetch from 'BaseFetch';
import App from './components/App.vue';
import Foo from './components/Foo.vue';
import Bar from './components/Bar.vue';
import store from './store/index';
const Home = {
    template: `
    <div class="home">
      <h2>Home133</h2>
      <p>hello</p>
    </div>
  `
};
const Default = { template: '<div class="default">default</div>' };
const Parent = {
    data () {
        return {
            transitionName: 'slide-left'
        }
    },
    // dynamically set transition based on route change
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
    template: `
    <div class="parent">
      <h2>Parent</h2>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  `
}
let fetch = new Fetch;
let routes = [{
    path: '/',
    component:Home,
},{
    path:'/parent',
    component: Parent,
    children: [
        {path:'',component:Default},
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar }
    ]
}];
const router = new VueRouter({
    base: __dirname,
    routes
});
new Vue({
    router,
    store,
    render: h=> h(App),
}).$mount('#app');
/*fetch.get('/demoUrl').then(v=>{
    debugger;
})*/
/*
$.ajax({
    url: '/demoUrl',
    type:'get',
    dataType:'JSON',
    success:function(result){
        debugger;
    }
})*/
