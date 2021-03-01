import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login/login.vue';

Vue.use(Router)
const vm = new Vue();

const router = new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/home',
      component: () => import('../pages/home.vue'),
      meta: { title: '首页' },
      children: [
        {
          path: 'resignlist',
          name: '注册信息列表',
          meta: { title: '注册信息列表' },
          component: () => import('../pages/resign/resignlist.vue'),
        },
        {
          path: 'Authorized',
          name: '注册信息查询',
          meta: { title: '注册信息查询' },
          component: () => import('../pages/resign/Authorized.vue'),
        },
        {
          path: 'resign',
          name: '注册',
          meta: { title: '注册' },
          component: () => import('../pages/resign/resign.vue'),
        }
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
      redirect: '/'
    },
  ]
})

// 当用户的没有登录时，禁止进入系统
// router.beforeEach((to, form, next) => {
//   var time = Date.now();
//   // 判断本地存储是否有msg值
//   const item = JSON.parse(localStorage.getItem("item") || "{}");
//   // 过期时间59分钟
//   const overtime = 59 * 60 * 1000;
//   // 判断时间是否过期
//   if ((time - item.time) < overtime == false) {
//     console.log(111);
//       vm.$message.info('登录失效，请重新登录！');
//     localStorage.removeItem("item")
//   }
//   if (to.path != "/") {
//     // 判断本地存储中的item是否为空
//     if (item == {}) {
//       next("/");
//       return;
//     }
//     // 如果本地存储item有值
//     if (item.msg) {
//       next()
//     } else {
//       next("/")
//     }
//   } else {
//     next();
//   }

// })

export default router;