/**
 * Created by Gaodun on 2017/5/22.
 */
import Vue from 'vue';
import Vuex,{mapState,mapGetters,mapMutations,mapActions} from 'vuex'
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false },
            { id: 3, text: '...', done: true }
        ],
        message:1234,
        count: 0
    },
    getters: {
        doneTodos: state=>{
            return state.todos.filter(todo=>todo.done);
        },
        test(){
            return 'hello'
        }
    },
    mutations: {
        increment (state,payload) {
            /*setTimeout(()=>{
                Vue.set(state,'count',payload.amount)
            },1000)*/
        },
        updateMessage(state,value){
            Vue.set(state,'message',value)
        }
    },
    actions: {
        increment2({commit}){
            commit('increment',{amount:10000})
        },
        updateMessage({commit},e){
            commit('updateMessage',e.target.value)
        }
    }
});
/*store.commit({
    type: 'increment',
    amount: 11
})*/
const Counter = {
    template: `<div>{{count}}<input :value="message" @input="updateMessage"/>{{message}}</div>`,
    computed:{
        ...mapState({
            count: state=> state.count,
            message: state=> state.message,
            countAlias: 'abc',
        }),
        ...mapGetters([
            'doneTodos',
            'test'
        ]),
        /*message:{
            get(){
                return this.$store.state.message
            },
            set(value){
                this.$store.commit('updateMessage', value)
            }
        }*/
    },
    methods: {
        ...mapMutations({
            add: 'increment'
        }),
        ...mapActions([
            'updateMessage'
        ])
    }

}
const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})