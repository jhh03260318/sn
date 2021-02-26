<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed">
      <div class="logo">数安&amp;云安授权系统</div>
      <a-menu theme="dark" :selectedKeys="[this.$route.path]" mode="inline">
        <a-menu-item key="/resignlist" @click="changemenu('resignlist')">
          <a-icon type="pie-chart" />
          <span>注册信息列表</span>
        </a-menu-item>
        <a-menu-item key="/Authorized" @click="changemenu('Authorized')">
          <a-icon type="pie-chart" />
          <span>注册信息查询</span>
        </a-menu-item>
        <a-menu-item key="/resign" @click="changemenu('resign')">
          <a-icon type="pie-chart" />
          <span>注册</span>
        </a-menu-item>
        <!-- <a-menu-item key="/applypk" @click="changemenu('applypk')">
          <a-icon type="pie-chart" />
          <span>pk申请</span>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="(item,index) of $route.matched" :key="index">
              <router-link :to="item.path">{{item.meta.title}}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        数安&amp;云安授权系统©2021 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    //   跳转路由
    changemenu(router) {
      this.$router.push(router);
    }
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
  color: aliceblue;
  font-weight: bolder;
  font-size: 18px;
}
</style>