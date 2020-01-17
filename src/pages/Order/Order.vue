<template>
  <div class="orderContainer">
    <topTitle title='订单'/>
    <div class="orderContentContainer">
      <div class="orderWrapper-login" v-if="login">
        <span>已登录</span>
      </div>
      <div class="orderWrapper-noLogin" v-else>
        <img src="./imgs/order/person.png" alt="">
        <p>登录后查看订单</p>
        <button class="loginBtn generalBtn" @click="gotoLogin">立即登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import topTitle from '../../components/top_title/top_title'
export default {
  data () {
    return {
      login: ''
    }
  },
  methods: {
    gotoLogin () {
      this.$router.push('login')
    }
  },
  components: {topTitle}
}
</script>

<style lang="less" rel="stylesheet/less">
@import "../../../static/css/common-style.less";
// @themeColor: #ff0;
.orderContainer{
  background-color: #eee;
  height: 100%;
  .orderContentContainer{
    .orderWrapper-noLogin{
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p{
        color: #666;
        font-size: 16px;
      }
      .loginBtn{
        margin-top: 10px;
        width: 90px;
        border-radius: 5px;
      }
    }
    .orderWrapper-login{
      padding: 50px 0;
    }
  }
}
</style>
