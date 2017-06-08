import Vue from 'vue';
import Fetch from 'BaseFetch';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import store from './store/index';
import router from './router/router';
Vue.use(VueRouter);
let fetch = new Fetch;
new Vue({
    base: __dirname,
    router,
    store,
    render: h=> h(App)
}).$mount('#app');
fetch.get('/test/getJSON').then(v=>{
    console.log(v)
})
/*
$.ajax({
    url: '/demoUrl',
    type:'get',
    dataType:'JSON',
    success:function(result){
        debugger;
    }
})*/
