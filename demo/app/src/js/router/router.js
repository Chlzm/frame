/**
 * Created by liu on 2017/6/8.
 */
import VueRouter from 'vue-router';
import Index from '../containers/Index.vue';
import List from '../containers/List.vue';
//import Item from '../containers/Item.vue';
const routes= [
    {path: '/',component: Index,name:'index'},
    {
        path: '/user/:username',
        component: List,
        name:'list',
        children:[{
            path:'item/:t',
            component:resolve => {
                // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
                // （代码分块）
                require.ensure(['../containers/Item.vue'], () => {
                    resolve(require('../containers/Item.vue'))
                },'list_item')
            },
            name:'item'
        }]
    }
    ];
const router = new VueRouter({
    routes
});
export default router;