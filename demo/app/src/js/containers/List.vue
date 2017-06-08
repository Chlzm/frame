<template>
    <div>
        <button @click="goIndex">去首页</button>
        <button @click="goChild">去子页</button>
        <router-view></router-view>
    </div>
</template>
<style scoped>
    ul,ol{list-style:none;}
</style>
<script>
    import { mapState,mapGetters,mapMutations,mapActions} from 'vuex';
    export default {
        props:['inputValue'],
        components: {},
        methods:{
            triggerAdd(){
                this.$store.dispatch('actionsAdd')
            },
            goIndex(){
                this.$router.push({name:'index'})
                //this.$router.go(-1)
            },
            goChild(){
                this.$router.push({name:'item',params:{t:123123123}})
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
