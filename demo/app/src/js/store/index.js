import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as list from './modules/list';
const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);
export default new Vuex.Store({
    getters,
    modules: {
        list,
    },
    strict:debug
})