<template>
  <div>
    <a-form layout="inline" :form="form" @submit="handleSubmit">
      <a-form-item>
        <a-input v-decorator="['email', search.email]" placeholder="请输入邮箱">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="['fid', search.fid]" placeholder="请输入FID">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="['pk', search.pk]" placeholder="请输入PK">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
        >
          搜索
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 表格 -->
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: true }"
    >
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="detail(record)">详情</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import { authorized } from "../../utils/request";
import { sntype } from "../../utils/public";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const columns = [
  {
    title: "机器码",
    dataIndex: 0,
    fixed: true
  },
  // {
  //   title: "邮箱",
  //   dataIndex: 2
  // },
  {
    title: "注册编号",
    dataIndex: 3
  },
  {
    title: "注册单位",
    dataIndex: 4
  },
  // {
  //   title: "姓名",
  //   dataIndex: 5
  // },
  // {
  //   title: "人员",
  //   dataIndex: 6
  // },
  // {
  //   title: "电话",
  //   dataIndex: 7
  // },
  {
    title: "日期",
    dataIndex: 8
  },
  {
    title: "IP",
    dataIndex: 9
  },
  {
    title: "授权类型",
    dataIndex: "sntype"
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
      hasErrors,
      form: this.$form.createForm(this),
      search: {
        email: {
          rules: [{ required: false }]
        },
        fid: {
          rules: [{ required: false }]
        },
        pk: { rules: [{ required: false }] }
      },
      data: [],
      columns
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // 查询注册信息
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.email == undefined) {
            values.email = "";
          }
          if (values.fid == undefined) {
            values.fid = "";
          }
          if (values.pk == undefined) {
            values.pk = "";
          }
          var params = new URLSearchParams();
          params.append("data", JSON.stringify(values));
          // 查询授权信息
          var arr = [];
          authorized(params).then(res => {
            res.data.forEach((item, index) => {
              var temp = {};
              item.forEach((value, index) => {
                temp[index] = value;
              });
              temp.key = index;
              sntype(temp, item[0].substring(32));
              arr.push(temp);
            });
            this.data = arr;
          });
        }
      });
    },
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
  }
};
</script>