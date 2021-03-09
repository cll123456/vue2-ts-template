<template>
  <div class="login-container">
    <div class="login-header">
      <img src="@/assets/login/logo.png" alt="登录logo" height="80%" />
    </div>
    <div class="login-body">
      <div class="login-form-container">
        <el-form
          ref="loginFormRef"
          class="form-style"
          :label-position="`right`"
          :model="loginFormData"
          status-icon
        >
          <div class="">
            <h2>表单登录</h2>
            <!-- <span><i class="web-font">南昌分公司</i></span
          ><span><i class="web-font">统一报表平台</i></span> -->
          </div>
          <el-form-item
            prop="username"
            :rules="
              FormValidator.checkStringLength(3, 50, '用户名', true, [
                'blur',
                'change',
              ])
            "
          >
            <el-input
              v-model="loginFormData.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              clearable
            />
          </el-form-item>
          <el-form-item
            class="el-item-style"
            prop="password"
            :rules="
              FormValidator.checkStringLength(0, 15, '用户名', true, [
                'blur',
                'change',
              ])
            "
          >
            <!-- 密码框 -->
            <el-input
              prefix-icon="el-icon-lock"
              v-model="loginFormData.password"
              :type="`${hasOpenEye ? 'text' : 'password'}`"
              placeholder="请输入密码"
            >
              <i
                slot="suffix"
                :class="[hasOpenEye ? 'el-icon-view' : 'iconfont iconeye1']"
                style="font-size: 14px; cursor: pointer"
                @click="hasOpenEye = !hasOpenEye"
              />
            </el-input>
          </el-form-item>
          <!--                滑块验证-->
          <el-form-item class="el-item-style">
            <div class="validate-slide-div">
              <login-validator
                ref="loginValidatorRef"
                :key="loginValidateKey"
              />
            </div>
          </el-form-item>
          <el-form-item class="el-item-style">
            <el-button
              :loading="loading"
              style="
                width: 100%;
                height: 46px;
                line-height: 15px;
                font-size: 23px;
              "
              type="primary"
              @click="login"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      <span> ©2020 信息科技部 - 中国人保南昌市分公司</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Ref, Vue } from "vue-property-decorator";
import LoginValidator from "@/components/LoginValidator/index.vue";
import { ILoginRes, loginForm } from "./types";
import { FormValidator } from "@/utils/formValidator";
import { APIGetMenu, ApiLogin } from "@/api/login/index";
import { AxiosResponse } from "node_modules/axios";
import { UserModule } from "@/store/modules/user";
import { Form } from "element-ui/types";

@Component({
  name: "Login",
  components: {
    LoginValidator,
  },
})
export default class extends Vue {
  // 登录表单数据
  private loginFormData: loginForm = {
    username: "16229767",
    password: "lg786991",
  };
  /**
   * 验证器
   */
  private FormValidator = FormValidator;
  /**
   * 密码框是否睁开眼
   */
  private hasOpenEye = false;
  /**
   * 登录按钮是否需要loding
   */
  private loading = false;
  /**
   * 表单的ref
   */
  @Ref() readonly loginFormRef!: Form;
  /**
   * 验证器的ref
   */
  @Ref() readonly loginValidatorRef!: LoginValidator;
  /**
   * 刷新验证组件的key
   */
  private loginValidateKey: string = Date.now().toString();
  /**
   * 登录
   */
  private login() {
    this.loginFormRef.validate(async (valide: boolean) => {
      // this.loading = true;
      if (valide && this.loginValidatorRef.isFinish) {
        // 登录获取数据
        // let resp: AxiosResponse<ILoginRes> = await ApiLogin(this.loginFormData);
        // // 存入token 和 用户data 的数据
        // UserModule.setToken(resp.data.token);
        // UserModule.setUserData(resp.data.data);
        
        // // 获取用户菜单
        // let menuRes = await APIGetMenu({
        //   phone: resp.data.data.mobile,
        //   comcode: resp.data.data.comcode,
        // });
        // console.log(menuRes);

        this.$router.push("/");
          this.loading = false;
      } else {
        this.$message.warning("请完善表单信息或者拖动滑块验证");
        this.loginValidateKey = Date.now().toString();
        this.loading = false;
      }
    });
  }

  private getMenu() {}
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  user-select: none;
  flex-direction: column;
  .login-header {
    display: flex;
    align-items: center;
    padding-left: 50px;
    cursor: pointer;
  }

  .login-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #322b34;
    font-size: 12px;
  }
  .login-header,
  .login-footer {
    height: 10%;
    background: $subColor;
  }
  .login-body {
    background: url("./../../../assets/login/login.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    flex: 1 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;

    .login-form-container {
      width: 30%;
      border: 1px solid mix($mainColor, #000, 80);
      box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.3);
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.3),
        rgba(0, 0, 0, 0.3)
      );
      padding: 20px 30px;
      border-radius: 5px;
    }
  }
}
</style>