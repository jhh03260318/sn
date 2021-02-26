<template>
  <div>
    <a-form layout="inline" :form="form" @submit="handleSubmit">
      <a-form-item
      >
        <a-input v-decorator="['email', search.email]" placeholder="请输入邮箱">
        </a-input>
      </a-form-item>
      <a-form-item
      >
        <a-input v-decorator="['fid', search.fid]" placeholder="请输入FID">
        </a-input>
      </a-form-item>
      <a-form-item
      >
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
    <a-table :columns="columns" :data-source="data" bordered :scroll="{ x: true }">
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
  </a-table>
  </div>
</template>

<script>
import { authorized } from "../../utils/request";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const columns = [
  {
    title: 'PK',
    dataIndex: 0,
    fixed:true
  },
  {
    title: '邮箱',
    dataIndex: 2,
  },
  {
    title: 'FID',
    dataIndex: 3,
  },
  {
    title: 'OU',
    dataIndex: 4,
  },
  {
    title: '姓名',
    dataIndex: 5,
  },
  {
    title: '人员',
    dataIndex: 6,
  },
  {
    title: '电话',
    dataIndex: 7,
  },
  {
    title: '日期',
    dataIndex: 8,
  },
  {
    title: 'IP',
    dataIndex: 9,
  },
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
      data:[],
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if(values.email == undefined){
            values.email=""
          };
          if(values.fid == undefined){
            values.fid=""
          };
          if(values.pk == undefined){
            values.pk=""
          };
          var params = new URLSearchParams();
          params.append("data", JSON.stringify(values));
          // 查询授权信息
          var arr = [];
          authorized(params).then(res => {
            res.data.forEach((item,index)=>{
              var temp = {};
              item.forEach((value,index)=>{
                temp[index] = value; 
              })
              temp.key = index;
              arr.push(temp);
            })
            this.data = arr;
          });
        }
      });
    }
  }
};
</script>