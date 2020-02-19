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
          <mt-field placeholder="请输入用户名" type="text" :state="nameState" v-model="name"></mt-field>
          <p class="errorText" v-show="nameState==='error'?true:false">用户名格式错误</p>
          <mt-field placeholder="请输入密码" :type="showOrHide?'text':'password'" :state="pwdState" v-model="pwd">
            <mt-switch v-model="showOrHide"></mt-switch>
          </mt-field>
          <p class="errorText" v-show="pwdState==='error'?true:false">密码至少为8位</p>
          <mt-field placeholder="请输入验证码" v-model="captcha">
            <img ref="captchaSvg" src="http://192.168.0.105:4000/captcha" @click="getCaptchaSvg">
          </mt-field>
          <button class="loginBtn" @click="pwdLogin">登录</button>
          <p class="aboutUs">关于我们</p>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-field placeholder="请输入手机号" type="tel" v-model="phone">
            <p :class="phoneState==='success'?'captchaBtn':'captchaBtn-disable'" @click="getCode()" v-if="!lockTime">获取验证码</p>
            <p class="captchaBtn-lock" v-else>已发送{{lockTime}}s</p>
          </mt-field>
          <p class="errorText" v-show="phoneState==='error'?true:false">手机号格式错误</p>
          <mt-field placeholder="验证码" type="text" v-model="sendcode"></mt-field>
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
// import {mapState} from 'vuex'
import {
  // reqLoginPwd,
  reqLoginSms
} from '../../api/index'
import localStore from '../../localStorage'

export default {
  data () {
    return {
      selected: '1',
      name: '',
      pwd: '',
      phone: '',
      captcha: '',
      nameState: '',
      pwdState: '',
      phoneState: '',
      lockTime: 0,
      intervalId: '',
      sendcode: '',
      showOrHide: false,
      user: ''
    }
  },
  methods: {
    getCode () {
      // 手机号格式正确且没有计时时运行
      if (this.phoneState === 'success' && !this.lockTime) {
        this.lockTime = 30
        this.intervalId = setInterval(() => {
          this.lockTime -= 1
          if (this.lockTime === 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
        // 发送ajax请求获取验证码
        this.$store.dispatch('reqSendcode', this.phone)
      }
    },
    getCaptchaSvg () {
      this.$refs.captchaSvg.src = 'http://192.168.0.105:4000/captcha?time=' + Date.now()
    },
    // async pwdLogin (param) {
    pwdLogin (param) {
      if (this.nameState === 'success') {
        if (this.pwdState === 'success') {
          if (this.captcha) {
            // const res = await reqLoginPwd(param)
            // if (res.code === 0) {
            //   console.log('success')
            //   this.user = res.data
            //   this.$router.replace('/profile')
            // } else {
            //   MessageBox('错误', res.msg)
            // }
            // const name = this.name
            this.$store.dispatch('reqSaveUserinfo', {name: this.name})
            localStore.save('userinfo', {name: this.name, phone: this.phone})
            this.$router.replace({name: 'profile'})
          } else {
            MessageBox('提示', '验证码不能为空')
            this.getCaptchaSvg()
          }
        } else {
          MessageBox('提示', '账号或密码有误')
        }
      } else {
        MessageBox('提示', '账号或密码有误')
      }
    },
    async messageLogin (param) {
      if (this.phoneState === 'success') {
        if (this.sendcode) {
          console.log('login success')
          const res = await reqLoginSms()
          if (res.code === 0) {
            console.log('success', res)
            // const phone = this.phone
            this.$store.dispatch('reqSaveUserinfo', {phone: this.phone})
            localStore.save('userinfo', {name: this.name, phone: this.phone, userid: Date.parse(new Date())})
            this.$router.replace({name: 'profile'})
          } else {
            MessageBox('错误', res.msg)
          }
        } else {
          MessageBox('提示', '验证码有误')
        }
      } else {
        MessageBox('提示', '手机号有误')
      }
      if (this.lockTime) {
        this.lockTime = 0
        clearInterval(this.intervalId)
        this.intervalId = ''
      }
    }
  },
  watch: {
    name (value) {
      // var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/ // 邮箱正则表达式
      var re = /^1[3456789]\d{9}$/
      if (re.test(value)) {
        this.nameState = 'success'
      } else {
        this.nameState = 'error'
      }
    },
    pwd () {
      var re = /^[a-zA-Z\d_]{8,}$/
      if (re.test(this.pwd)) {
        this.pwdState = 'success'
      } else {
        this.pwdState = 'error'
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
        .mint-switch-input:checked + .mint-switch-core{
          border-color: @themeColor;
          background-color: @themeColor;
        }
        .captchaBtn{
          color: @themeColor;
        }
        .captchaBtn-disable{
          color: #aaa;
        }
        .captchaBtn-lock{
          width: 80px;
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
