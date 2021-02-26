// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
//全局引入antdesign
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 引入状态管理层
import store from './store';
// 全局使用antdesign
Vue.use(Antd);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
