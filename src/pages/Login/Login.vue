<template>
  <div class="loginContainer">
    <goBack/>
    <div class="loginContentContainer">
      <p class="loginTitle">易速外卖</p>
      <div class="loginWrapper">
        <mt-navbar v-model="selected">
        <mt-tab-item id="1">密码登录</mt-tab-item>
        <mt-tab-item id="2">短信登录</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-field placeholder="请输入邮箱" type="text" :state="emailState" v-model="email"></mt-field>
          <p class="errorText" v-show="emailState==='error'?true:false">email格式错误</p>
          <mt-field placeholder="请输入密码" type="password" :state="passwordState" v-model="password"></mt-field>
          <p class="errorText" v-show="passwordState==='error'?true:false">密码错误</p>
          <mt-field placeholder="请输入验证码" v-model="captcha">
            <img src="" height="45px" width="100px">
          </mt-field>
          <button class="loginBtn" @click="passwordLogin">登录</button>
          <p class="aboutUs">关于我们</p>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-field placeholder="请输入手机号" type="tel" v-model="phone">
            <p :class="phoneState==='success'?'captchaBtn':'captchaBtn-disable'" @click="getCaptcha()" v-if="!clickLock">获取验证码</p>
            <p class="captchaBtn-lock" v-else>{{lockTime}}s</p>
          </mt-field>
          <p class="errorText" v-show="phoneState==='error'?true:false">手机号格式错误</p>
          <mt-field placeholder="验证码" type="text" v-model="captcha"></mt-field>
          <button class="loginBtn" @click="messageLogin">登录</button>
          <p class="aboutUs">关于我们</p>
        </mt-tab-container-item>
      </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
import goBack from '../../components/goback/goback'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      selected: '1',
      email: '',
      password: '',
      phone: '',
      captcha: '',
      emailState: '',
      passwordState: '',
      phoneState: '',
      clickLock: false,
      lockTime: 60
    }
  },
  methods: {
    getCaptcha () {
      if (this.phoneState === 'success') {
        if (this.clickLock) {
          return
        }
        this.clickLock = true
        let timer = setInterval(() => {
          this.lockTime -= 1
          if (this.lockTime === 0) {
            clearInterval(timer)
            this.clickLock = false
            this.lockTime = 60
          }
        }, 1000)
      } else {
        this.phoneState = 'error'
      }
    },
    passwordLogin () {
      if (this.emailState === 'success') {
        if (this.passwordState === 'success') {
          if (this.captcha === 'success') {
            console.log('login success')
          } else {
            MessageBox('提示', '验证码有误')
          }
        } else {
          MessageBox('提示', '账号或密码有误')
        }
      } else {
        MessageBox('提示', '账号或密码有误')
      }
    },
    messageLogin () {
      if (this.phoneState === 'success') {
        if (this.captcha === 'success') {
          console.log('login success')
        } else {
          MessageBox('提示', '验证码有误')
        }
      } else {
        MessageBox('提示', '手机号有误')
      }
    }
  },
  watch: {
    email () {
      var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (re.test(this.email)) {
        this.emailState = 'success'
      } else {
        this.emailState = 'error'
      }
    },
    password () {
      var re = /^[a-zA-Z\d_]{8,}$/
      if (re.test(this.password)) {
        this.passwordState = 'success'
      } else {
        this.passwordState = 'error'
      }
    },
    phone () {
      var re = /^1[3456789]\d{9}$/
      if (re.test(this.phone)) {
        this.phoneState = 'success'
      } else {
        this.phoneState = 'error'
      }
    }
  },
  components: {goBack}
}
</script>

<style lang="less" rel="stylesheet/less">
  @themeColor: #02a774;
.loginContainer{
  padding-top: 70px;
  .loginContentContainer{
    width: 100%;
    // height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .loginTitle{
      font-size: 42px;
      font-weight: bold;
      color: @themeColor;
      text-align: center;
      margin-bottom: 30px;
    }
    .loginWrapper{
      width: 80%;
      .mint-navbar{
        // padding: 0 60px;
        margin-bottom: 10px;
        justify-content: center;
        .mint-tab-item{
          width: 84px;
          padding: 0;
          flex: none;
          text-align: right;
          &:first-child{
            text-align: left;
          }
          .mint-tab-item-label{
            display: inline-block;
            padding: 10px 0 5px;
            font-size: 16px;
          }
        }
        .mint-tab-item.is-selected{
          border-bottom: none;
          .mint-tab-item-label{
            color: #02a774;
            border-bottom: 1px solid #02a774;
          }
        }
      }
      .mint-cell{
        border: 1px solid #eee;
        border-radius: 5px;
        margin-top: 15px;
        &:first-child{
          margin-top: 0;
        }
        .captchaBtn{
          color: @themeColor;
        }
        .captchaBtn-disable{
          color: #aaa;
        }
        .captchaBtn-lock{
          width: 50px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          color: #aaa;
          font-size: 16px;
        }
      }
      .errorText{
        padding: 5px 10px;
        font-size: 15px;
        color: #f44336;
      }
      .loginBtn{
        width: 100%;
        height: 46px;
        background-color: @themeColor;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        color: #fff;
        margin-top: 15px;
      }
      .aboutUs{
        text-align: center;
        color: #777;
        font-size: 14px;
        margin-top: 20px;
      }
      .mint-popup{
        width: 200px;
        height: 200px;
        border-radius: 10px;
        div{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .errorTitle{
            color: #f44336;
            font-size: 18px;
            font-weight: bold;
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
          }
          .errorText{
            color: #999;
            // flex-grow: 8;
          }
        }
      }
    }
  }
}
</style>
