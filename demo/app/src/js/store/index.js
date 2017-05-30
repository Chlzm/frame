import Vuex from 'vuex';
import * as getters from './getters';
import list from './modules/list';
import detail from './modules/detail';
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    getters,
    modules: {
        list,
        detail
    },
    strict:debug
})