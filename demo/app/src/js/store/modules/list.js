import * as types from '../mutation-types';
const state = {
    message: 123
};
const actions = {
    triggerAddToCart({commit,state},parameter = 2){
        commit(types.ADD_TO_CART,parameter);
    },
    removeFromCart2(store,parameter = 3){
        console.log(store.rootState.detail.detailMessage);
        store.commit(types.REMOVE_FROM_CART,parameter);
    }
};
const mutations = {
    [types.ADD_TO_CART](state,parameter = 1){
        state.message += parameter;
        // mutations 不能执行异步方法
        /*setTimeout(()=>{
            state.message += parameter;
        },1000);*/
    },
    [types.REMOVE_FROM_CART](state,parameter = 1){
        let value = state.message - parameter;
        Vue.set(state,'message',value);
    }
};
export default {
    state,
    actions,
    mutations
}