<template>
  <div id="registlist">
    <a-table :columns="columns" :dataSource="resignlist" :scroll="{ x: true }">
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="detail(record)">详情</a>
      </span>
    </a-table>
  </div>
</template>

<script>
// 引用接口数据
import { mapGetters, mapActions } from "vuex";
const columns = [
  {
    title: "机器码",
    dataIndex: 0,
    fixed: true
  },
  {
    title: "注册编号",
    dataIndex: 3
  },
  {
    title: "注册单位",
    dataIndex: 4
  },
  // {
  //   title: "注册地址",
  //   dataIndex: 5
  // },
  // {
  //   title: "姓名",
  //   dataIndex: 6
  // },
  // {
  //   title: "TEL",
  //   dataIndex: 7
  // },
  // {
  //   title: "邮箱",
  //   dataIndex: 2
  // },
  {
    title: "注册日期",
    dataIndex: 8
  },
  {
    title: "IP",
    dataIndex: 9
  },
  {
    title: "授权类型",
    dataIndex:'sntype'
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      columns
    };
  },
  computed: {
    ...mapGetters({
      resignlist: "resign/resignlist"
    })
  },
  methods: {
    ...mapActions({
      resignListActions: "resign/ResignListActions"
    }),
    // 详情信息
    detail(action) {
      const h = this.$createElement;
      this.$info({
        title: "详细信息",
        content: h("div", {}, [
          h("p", "机器码：" + action[0]),
          h("p", "SN码：" + action[1]),
          h("p", "姓名：" + action[6]),
          h("p", "电话：" + action[7]),
          h("p", "邮箱：" + action[2]),
          h("p", "注册单位：" + action[4]),
          h("p", "注册地址：" + action[5]),
          h("p", "IP地址：" + action[9]),
          h("p", "授权类型：" + action.sntype)
          ])
      });
    }
  },
  mounted() {
    this.resignListActions();
  }
};
</script>

<style scoped>
</style>