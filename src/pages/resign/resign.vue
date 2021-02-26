<template>
  <div id="resign">
    <a-form
      :form="form"
      @submit="handleSubmit"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-item v-bind="formItemLayout" label="pk">
        <a-input
          v-decorator="[
            'pk',
            {
              rules: [
                {
                  required: true,
                  message: '请输入PK'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="pk码类型">
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
                {
                  validator: validateToNextPassword
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="FID">
        <a-input
          v-decorator="[
            'fid',
            {
              rules: [
                {
                  required: true,
                  message: '请输入FID'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="ou">
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
            'pname',
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
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="people">
        <a-input
          v-decorator="[
            'people',
            {
              rules: [
                {
                  required: true,
                  message: '请输入名称'
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
    handleSubmit(e) {
      e.preventDefault();
      const h = this.$createElement;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.pk = values.pk + values.pkcode;
          delete values.pkcode;
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
          });
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
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
    }
  }
};
</script>
<style scoped>
#resign{
  width: 70%;
}
</style>