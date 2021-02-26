<template>
  <div id="registlist">
    <a-table :columns="columns" :dataSource="resignlist" :scroll="{ x: true }">
      <template v-slot:action>
        <a href="javascript:;">Delete</a>
      </template>
    </a-table>
  </div>
</template>

<script>
// 引用接口数据
import { mapGetters, mapActions } from "vuex";
const columns = [
  {
    title: "注册PK",
    dataIndex: 0,
    fixed:true
  },
  {
    title: "邮箱",
    dataIndex: 2
  },
  {
    title: "注册FID",
    dataIndex: 3
  },
  {
    title: "注册OU",
    dataIndex: 4
  },
  {
    title: "注册地址",
    dataIndex: 5
  },
  {
    title: "姓名",
    dataIndex: 6
  },
  {
    title: "TEL",
    dataIndex: 7
  },
  {
    title: "注册日期",
    dataIndex: 8
  },
  {
    title: "IP",
    dataIndex: 9
  },
  {
    title: "操作",
    dataIndex: 10
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
    })
  },
  mounted() {
    this.resignListActions();
  }
};
</script>

<style scoped>
</style>