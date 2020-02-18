<template>
  <div class="appContainer">
    <router-view v-if="isRouterAlive"/>
    <mintNav v-show="showOrHideNav()"/>
  </div>
</template>

<script>
import mintNav from './components/mint_nav/mint_nav'
// 引入调用本地存储的方法
// import localStorage from './localStorage'

export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  // 底部导航栏显示白名单
  methods: {
    reload () {
      console.log('reload==========')
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    showOrHideNav () {
      let navArr = ['/home', '/search', '/order', '/profile']
      let path = this.$route.path
      if (navArr.indexOf(path) >= 0) {
        return true
      } else {
        return false
      }
    }
  },
  // watch: {
  // 深度监视items的值变化,若变化则存储最新的值
  //   items: {
  //     handler: function (items) {
  //       localStorage.save(items)
  //     },
  //     deep: true
  //   }
  // 监视路由变化,重新加载某个路由
  //   $route (to, from) {
  //     if (to.path === '/search') {
  //       location.reload()
  //     }
  //   }
  // },
  components: {mintNav}
}
</script>

<style lang="less" rel="stylesheet/less">
.appContainer{
  width: 100%;
  height: 100%;
  // background-color: #f5f5f5;
  // touch-action: none;
}
</style>
