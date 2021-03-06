import Vue from 'vue';
const vm = new Vue();
import router from '../../router/index';
// 请求接口
import { resignList, authorized } from '../../utils/request';

import {sntype} from '../../utils/public'
const state = {
    resignList: [],//注册信息列表
};
const mutations = {
    changresignList(state, arr) {
        state.resignList = arr;
    }
};
const actions = {
    // 注册信息列表
    ResignListActions(context) {
        resignList().then(res => {
            var arr = [];
            if (res.status === 200) {
                res.data.forEach((item, index) => {
                    // console.log(item[0].substring(31));
                    var temp = {};
                    item.forEach((value, index) => {
                        temp[index] = value;
                    });
                    temp.key = index;
                    sntype(temp,item[0].substring(32));
                    arr.push(temp);
                })
                context.commit("changresignList", arr);
            }
        }).catch((err)=>{
            // 当放回的状态码为401时，跳转到登录页
            if(err.response.status==401){
                vm.$message.info('登录过期，请重新登录！');
                router.push("/");
            }
        })
    },
};
const getters = {
    resignlist(state) {
        return state.resignList;
    }
};
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}