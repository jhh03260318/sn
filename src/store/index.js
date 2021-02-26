// 状态管理层
//引入vue
import Vue from 'vue';
// 引入vuex
import Vuex from 'vuex';
Vue.use(Vuex);
import { state, mutations, getters } from './mutitons';
import actions from './actions';
import resign from './modules/resign';
// 暴露
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        resign
    }
})