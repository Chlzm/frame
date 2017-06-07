import Vue from 'vue';
import Fetch from 'BaseFetch';
import App from './components/App.vue';
import store from './store/index';
let fetch = new Fetch;
new Vue({
    store,
    render: h=> h(App),
}).$mount('#app');
fetch.get('/test/getJSON').then(v=>{
    console.log(v)
    debugger;
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
