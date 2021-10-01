<template>
  <el-container>
    <el-header></el-header>
    <el-main class="main">
      <h1>验证码查询平台登录</h1>
      <el-form ref="form" :model="form" class="z-depth-2">
        <el-alert
          >登录功能仅供管理员使用。若您从经销商处得到了核验码，请以用户身份登录。</el-alert
        >
        <el-form-item style="margin-top:20px">
          <el-input v-model="form.phone_number" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.sms_code" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="primary" @click="pushLoginSMS">发送验证码</el-button>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="primary" @click="login">验证码登录</el-button>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="success" @click="logInAsUser"
            >以用户身份登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import ajax from "../ajax.js";
import params from "../golbal";
export default {
  name: "Login",
  data() {
    return {
      form: {
        phone_number: "",
        sms_code: "",
      },
    };
  },
  methods: {
    pushLoginSMS() {
      const phoneNumber = this.form.phone_number;
      if (phoneNumber.length != 11) {
        alert("请输入正确的手机号码！");
        return;
      }
      ajax({
        methods: "GET",
        url: params.api_send_sms,
        data: {
          phone_number: phoneNumber,
        },
        success: function(res) {
          switch (res.statusCode) {
            case 0: {
              alert("验证码已发送，请查收！若60秒后未收到，请点击重发");
              break;
            }
            case 5: {
              alert("60秒内已有验证码短信下发，请稍后重试");
              break;
            }
            case 7: {
              alert("您不是管理员身份，请以游客身份使用本系统！");
              break;
            }
            default: {
              alert("服务器异常，请稍后重试！");
            }
          }
        },
        fail: function(res) {
          alert("无法访问服务器，请稍后再试！");
        },
      });
    },
    login() {
      if (this.form.phone_number.length != 11) {
        alert("您输入的手机号码有误！");
        return;
      } else if (this.form.sms_code.length != 6) {
        alert("请输入正确的验证码！");
        return;
      }
      ajax({
        methods: "GET",
        url: params.api_get_token,
        data: {
          phone_number: this.form.phone_number,
          code: this.form.sms_code,
        },
        success: (res) => {
          switch (res.statusCode) {
            case 0: {
              let token = res.data.token;
              this.$cookies.set("token", token, "1d");
              this.$router.push("/Home");
              break;
            }
            default: {
              alert("登录失败，请检查输入信息！");
            }
          }
        },
        fail: (res) => {
          alert("服务暂不可用，请稍后重试！");
        },
      });
    },
    logInAsUser() {
      this.$cookies.set("token", "user", "1d");
      this.$router.push("/Home");
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #606266;
}

form {
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 2px;
}

.main {
  width: 400px;
  margin: 0px auto;
}
</style>
