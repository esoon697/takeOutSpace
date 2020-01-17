<template>
  <div class="loginContainer">
    <topTitle>
      <span class="leftPart iconfont icon-zuojiantou_huaban" slot="left" @click="goBack"></span>
      <span class="centerPart" slot="center">账号注册</span>
      <span class="rightPart" slot="right"></span>
    </topTitle>
    <!-- <goBack/> -->
    <div class="loginWrapper">
      <div class="inputWrapper">
        <div class="inputItem">
          <span class="iconfont icon-webicon205"></span>
          <mt-field placeholder="请输入手机号" type="tel" v-model="phone">
          </mt-field>
        </div>
        <p class="errorText" v-show="phoneState==='error'?true:false">手机号格式错误</p>
      </div>
      <div class="inputWrapper">
        <div class="inputItem">
          <span class="iconfont icon-yanzhengma"></span>
          <mt-field placeholder="请填写验证码" type="text" v-model="captcha">
          <p :class="phoneState==='success'?'captchaBtn':'captchaBtn-disable'" @click="getCaptcha()" v-if="!clickLock">获取验证码</p>
          <p class="captchaBtn-lock" v-else>发送验证码({{lockTime}}s)</p>
          </mt-field>
        </div>
      </div>
      <div class="inputWrapper">
        <div class="inputItem">
          <span class="iconfont icon-shengribirthday17"></span>
          <mt-field placeholder="请输入生日" v-model="bornValue">
            <span class="iconfont icon-riqi" @click="selectData"></span>
          </mt-field>
        </div>
        <p class="errorText" v-show="bornState==='error'?true:false">日期格式错误,格式如:xxxx-xx-xx</p>
      </div>
      <button class="loginBtn" @click="goLogin">登录</button>
      <p class="aboutUs">@Esoon</p>
    </div>
    <mt-datetime-picker class="dateTime"
      ref="picker"
      type="date"
      v-model="pickerValue"
      @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
import Vue from 'vue'
import topTitle from '../../components/top_title/top_title'
import { MessageBox, DatetimePicker } from 'mint-ui'

Vue.use(DatetimePicker)
export default {
  data () {
    return {
      phone: '',
      captcha: '',
      phoneState: '',
      clickLock: false,
      lockTime: 60,
      pickerValue: '',
      bornValue: '',
      bornState: ''
    }
  },
  methods: {
    goBack () {
      console.log('返回')
      this.$router.back()
    },
    getCaptcha () {
      if (this.phoneState === 'success') {
        if (this.clickLock) {
          return
        }
        this.clickLock = true
        console.log('sendAPl') // 调用获取验证码接口
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
    goLogin () {
      if (this.phoneState === 'success') {
        if (this.captcha === 'success') {
          console.log('login success')
          // 发送Ajax请求,并验证验证码
          // 验证码正确,跳转到相应页面
        } else {
          MessageBox('提示', '验证码有误')
        }
      } else {
        MessageBox('提示', '手机号有误')
      }
    },
    formatDate (secs) {
      var t = new Date(secs)
      var year = t.getFullYear()
      var month = t.getMonth() + 1
      if (month < 10) { month = '0' + month }
      var date = t.getDate()
      if (date < 10) { date = '0' + date }
      var hour = t.getHours()
      if (hour < 10) { hour = '0' + hour }
      var minute = t.getMinutes()
      if (minute < 10) { minute = '0' + minute }
      var second = t.getSeconds()
      if (second < 10) { second = '0' + second }
      return year + '-' + month + '-' + date
    },
    selectData () { // 打开时间选择器
      console.log('pass')
      // 如果已经选过日期，则再次打开时间选择器时，日期回显（不需要回显的话可以去掉 这个判断）
      if (this.bornValue) {
        this.pickerValue = this.bornValue
      } else {
        this.pickerValue = new Date()
      }
      this.$refs.picker.open()
    },
    handleConfirm () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
      this.bornValue = this.formatDate(this.pickerValue)
    }
  },
  watch: {
    bornValue () {
      var re = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/
      if (re.test(this.bornValue)) {
        this.bornState = 'success'
      } else {
        this.bornState = 'error'
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
  components: {topTitle}
}
</script>

<style lang="less" rel="stylesheet/less">
  @themeColor: #343434;
.loginContainer{
  width: 100%;
  height: 100%;
  background-color: #eee;
  .dateTime{
    width: 100%;
    height: 200px;
  }
  .loginWrapper{
    padding: 0 10px;
    .inputWrapper{
      display: flex;
      flex-direction: column;
      margin: 10px 0;
      .inputItem{
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        .iconfont{
          display: block;
          font-size: 20px;
          color: #999;
          margin-left: 5px;
        }
        .mint-cell{
          width: 100%;
          .mint-field-core{
            color: #666;
          }
          .captchaBtn-disable{
            color: #ddd;
          }
          .captchaBtn, .captchaBtn-lock{
            padding: 8px;
            background-color: #ddd;
            color: #fff;
            border-radius: 5px;
          }
      }
    }
    .errorText{
        padding: 10px 10px 0;
        font-size: 15px;
        color: #E01B46;
      }
    }
    .loginBtn{
      width: 100%;
      height: 46px;
      background-color: #E01B46;
      border: none;
      border-radius: 7px;
      font-size: 16px;
      color: #fff;
    }
    .aboutUs{
      text-align: center;
      color: #777;
      font-size: 14px;
      margin-top: 20px;
    }
  }
}
</style>
