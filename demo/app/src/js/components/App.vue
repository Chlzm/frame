<template>
    <div id="app">
        <h1>首页</h1>
        <ul>
            <li><router-link to="/">/</router-link></li>
            <li><router-link to="/parent">/parent</router-link></li>
            <li><router-link to="/parent/foo">/parent/foo</router-link></li>
            <li><router-link to="/parent/bar">/parent/bar</router-link></li>
        </ul>
        <router-view class="view"></router-view>
    </div>
</template>
<style>
    ul,ol{list-style:none;}
</style>
<script>
    import List from './List.vue';
    import Detail from './Detail.vue';
    import store from '../store';
    import { mapState,mapGetters,mapMutations,mapActions} from 'vuex';
    export default {
        props:['inputValue'],
        components: {List,Detail},
        methods:{
            triggerAdd(){
                this.$store.dispatch('triggerAddToCart')
            }
        },
        computed: {
            ...mapState({
                count:state=>{
                    return state.list.message;
                }
            }),
            ...mapGetters([
                'changeMessage'
            ])
           /* count(){
                console.log(this)
                return store.state.list.message
            }*/
        }
    }
</script>
