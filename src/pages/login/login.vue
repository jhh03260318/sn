<template>
  <!-- 登录界面 -->
  <div class="login">
    <div class="login-box">
      <h3>用户认证(登录)</h3>
      <a-input placeholder="请输入用户名" v-model="username">
        <a-icon slot="prefix" type="user" />
      </a-input>
      <a-input placeholder="请输入密码" v-model="password" type="password">
        <a-icon slot="prefix" type="lock" />
      </a-input>
      <a-button type="primary" @click="login">
        登录
      </a-button>
    </div>
  </div>
</template>

<script>
import { login } from "../../utils/request";
export default {
  data() {
    return {
      username: "",
      password: "",
      formdata: {
        user: "",
        passwd: ""
      }
    };
  },
  methods: {
    // 用户登录
    login() {
      // 用户登录所需要的参数
      this.formdata.user = this.username; //用户姓名
      this.formdata.passwd = this.password; //用户密码
      let user_params = new URLSearchParams();
      user_params.append("data", JSON.stringify(this.formdata));
      // 请求接口
      login(user_params).then(res => {
        console.log(res);
        if (res.data.success == "False") {
          this.success("登录失败！请核对账号和密码");
        } else {
          var item = {};
          item.msg = res.data.success;
          // 获取当前时间
          item.time = Date.now();
          localStorage.setItem("item", JSON.stringify(item));
          // 跳转到首页
          this.$router.push("/home");
        }
      });
    },
    // 系统消息提示
    success(message) {
      this.$success({
        title: "系统提示",
        // JSX support
        content: (
          <div>
            <p>{message}</p>
          </div>
        )
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#553443, #2f3d60);
  position: fixed;
  left: 0;
  top: 0;
  position: relative;
}
.login-box {
  width: 502px;
  height: 302px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
h3 {
  font-size: 24px;
  width: auto;
  text-align: center;
  line-height: 24px;
  margin-top: 36px;
}
.login-box >>> .ant-input {
  width: 320px;
  margin-left: 91px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.login-box >>> .ant-input-affix-wrapper .ant-input-prefix {
  margin-left: 91px;
}
</style>
