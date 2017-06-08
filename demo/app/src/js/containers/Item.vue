<template>
    <div>
        <h1>ITEM页</h1>
        <button @click="goList">去列表页</button>
        {{mount}}
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
            goList(){
                //this.$router.push({name:'index'})
                this.$router.go(-1)
            }
        },
        computed: {
            mount(){
                debugger;
            },
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
