<template>
    <div id="app">
        <!--getters: {{deriveStateNumber}}<br/>-->
        state: {{count}}
        <div>
            <button @click="triggerAdd">加</button>
            <button>减</button>
        </div>
        ------------------------------
        <list></list>
    </div>
</template>
<style scoped>
    ul,ol{list-style:none;}
</style>
<script>
    import List from './List.vue';
    import { mapState,mapGetters,mapMutations,mapActions} from 'vuex';
    export default {
        props:['inputValue'],
        components: {List},
        methods:{
            triggerAdd(){
                this.$store.dispatch('actionsAdd')
            }
        },
        computed: {
            ...mapState({
                count:state=>{
                    return state.list.number;
                }
            }),
            ...mapGetters([
                'deriveStateNumber',
            ])
           /* count(){
                console.log(this)
                return store.state.list.message
            }*/
        }
    }
</script>
