<template>
  <div id="resign">
    <a-form
      :form="form"
      @submit="handleSubmit"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-item v-bind="formItemLayout" label="机器码">
        <a-input
          v-decorator="[
            'pk',
            {
              rules: [
                {
                  required: true,
                  message: '请输入机器码'
                },
                { validator: pkrule }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="授权类型">
        <a-select
          style="width: 30%;margin-bottom:20px"
          v-decorator="[
            'pkcode',
            {
              rules: [
                {
                  required: true,
                  message: '请选择pk码类型'
                }
              ]
            }
          ]"
        >
          <a-select-option value="0">
            60天试用
          </a-select-option>
          <a-select-option value="1">
            90天试用
          </a-select-option>
          <a-select-option value="2">
            180天试用
          </a-select-option>
          <a-select-option value="3">
            360天试用
          </a-select-option>
          <a-select-option value="4">
            正式（4）
          </a-select-option>
          <a-select-option value="5">
            正式（5）
          </a-select-option>
          <a-select-option value="6">
            正式（6）
          </a-select-option>
          <a-select-option value="7">
            正式（80）
          </a-select-option>
          <a-select-option value="8">
            正式（100）
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱!'
                },
                { validator: emailrule }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="编号">
        <a-select
          style="width: 30%;margin-bottom:20px"
          v-decorator="[
            'fid',
            {
              rules: [
                {
                  required: true,
                  message: '请选择编号'
                }
              ]
            }
          ]"
        >
          <a-select-option value="ZHCS">
            ZHCS
          </a-select-option>
          <a-select-option value="ZHDS">
            ZHDS
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="单位名称">
        <a-input
          v-decorator="[
            'ou',
            {
              rules: [
                {
                  required: true,
                  message: '请输入ou'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="姓名">
        <a-input
          v-decorator="[
            'people',
            {
              rules: [
                {
                  required: true,
                  message: '请输入姓名!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="电话">
        <a-input
          v-decorator="[
            'tel',
            {
              rules: [
                {
                  required: true,
                  message: '请输入电话'
                },
                { validator: telrule }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="单位地址">
        <a-input
          v-decorator="[
            'pname',
            {
              rules: [
                {
                  required: true,
                  message: '请输入注册地址'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit">
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { resign, resignList } from "../../utils/request";
export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    // 提交注册
    handleSubmit(e) {
      e.preventDefault();
      const h = this.$createElement;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.pk = values.pk + values.pkcode;
          delete values.pkcode;
          // console.log(values);
          var params = new URLSearchParams();
          params.append("data", JSON.stringify(values));
          //调用接口
          resign(params).then(res => {
            console.log(res);
            if (res.data.error == "") {
              this.$info({
                title: "系统提示",
                content: h("div", {}, [
                  h("p", "注册成功，您的SN码为：" + res.data.sn)
                ])
              });
            } else {
              this.$info({
                title: "系统提示",
                content: h("div", {}, [h("p", "注册失败：" + res.data.error)])
              });
            }
          }).catch(err=>{
            if(err.response.status == 401){
              this.$message.info('登录过期，请重新登录！');
              this.$store.push("/");
            }
          });
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(
          domain => `${value}${domain}`
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    // 邮箱规则验证
    emailrule(rule, value, callback) {
      // 验证邮箱正则
      var regular = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (regular.test(value) == false) {
        callback("邮箱格式不正确，请重新输入");
      } else {
        // 如果通过校验，调用无参数的 `callback()` 即可
        callback();
      }
    },
    // 电话号码验证
    telrule(rule, value, callback) {
      var regular = /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/;
      if (regular.test(value) == false) {
        callback("号码有误，请重新输入");
      } else {
        // 如果通过校验，调用无参数的 `callback()` 即可
        callback();
      }
    },
    // 机器码验证
    pkrule(rule, value, callback) {
      if (value.length < 32 || value.length > 32) {
        callback("请输入32位机器码");
      } else {
        // 如果通过校验，调用无参数的 `callback()` 即可
        callback();
      }
    }
  },
  mounted() {
    this.form.setFieldsValue({
      "pkcode": "0",
      "fid":"ZHCS"
    });
  }
};
</script>
<style scoped>
#resign {
  width: 70%;
}
</style>