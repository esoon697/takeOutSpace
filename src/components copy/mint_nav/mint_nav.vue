<template>
  <div class="mt-tabbar-container">
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="/home">
        <div class="item_icon" @click="gotoNav('/home')">
          <i class="iconfont icon-shouye_huaban"></i>
          <span>外卖</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="/search">
        <div class="item_icon" @click="gotoNav('/search')">
          <i class="iconfont icon-sousuo"></i>
          <span>搜索</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="/order">
        <div class="item_icon" @click="gotoNav('/order')">
          <i class="iconfont icon-dingdan_huaban"></i>
          <span>订单</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="/profile">
        <div class="item_icon" @click="gotoNav('/profile')">
          <i class="iconfont icon-wode_huaban"></i>
          <span>我的</span>
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: ''
    }
  },
  mounted () {
    let nowPath = this.$route.path
    this.selected = nowPath
  },
  methods: {
    gotoNav (path) {
      let nowPath = this.$route.path
      if (nowPath !== path) {
        // let target = path + '?id = ' + Math.random()
        // console.log(target)
        this.$router.replace(path)
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      let nowPath = this.$route.path
      this.selected = nowPath
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.mt-tabbar-container{
  width: 100%;
  height: 50px;
  position: fixed;
}
.item_icon{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  touch-action: none
}
.mint-tabbar > .mint-tab-item.is-selected{
  background-color: #fafafa;
  color: #02a774
}
.item_icon span{
  font-size: 12px
}
.iconfont{
  font-size: 24px
}
</style>
