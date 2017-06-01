import {ADD,SUBTRACT} from '../mutation-types'; // 'ADD' , 'SUBTRACT'
const state = {
    number: 2,
    checkoutNumber:'checkoutNumber'
};
const getters = {
    checkoutNumber: state => {
        return state.number + 3
    }
}
// 方法调用逻辑
const actions = {
    actionsAdd({commit,state,dispatch},p){
        commit(ADD,"your parameters");
    },
    actionsSubtract({commit,state},p){
        //commit(ADD,"your parameters")
    },
};
// 逻辑代码
const mutations = {
    [ADD](state,a){
        state.number += 1;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}