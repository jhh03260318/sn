import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login/login.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: ()=>import('../pages/home.vue'),
      meta: { title: '首页' },
      children: [
        {
          path: 'resignlist',
          name: '注册信息',
          meta: { title: '注册信息' },
          component: () => import('../pages/resign/resignlist.vue'),
        },
        {
          path: 'Authorized',
          name: '授权注册信息',
          meta: { title: '授权注册信息' },
          component: () => import('../pages/resign/Authorized.vue'),
        },
        {
          path: 'resign',
          name: '注册',
          meta: { title: '注册' },
          component: () => import('../pages/resign/resign.vue'),
        },
        // {
        //   path: 'applypk',
        //   name: '注册',
        //   meta: { title: 'pk码申请' },
        //   component: () => import('../pages/resign/applypk.vue'),
        // }
      ]
    },
    {
      path: '*',
      redirect:'/'
    },
  ]
})
