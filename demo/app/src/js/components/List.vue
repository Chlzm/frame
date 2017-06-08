<template>
    <div>
        <span>{{inputValue}}</span>
        <button @click="actionsAdd">子组件按钮</button>
        {{count}}
    </div>
</template>

<script>
    import {mapState,mapActions,mapGetters} from 'vuex';
    export default {
        props: {
              inputValue: Number
        },
        computed: {
            /*count(){
                return this.$store.state.list.number
            },*/
            ...mapState({
                count : state => state.list.number
            }),
            ...mapGetters([
                'checkoutNumber'
            ])
        },
        methods: {
            method1(){
                this.$store.dispatch('actionsAdd')
            },
            ...mapActions([
                'actionsAdd'
            ])
        }
    }
</script>
