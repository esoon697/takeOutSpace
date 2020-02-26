<template>
  <div class="appContainer">
    <div class="routerLoading" v-show="routerLoading">加载中</div>
    <transition :name="transitionName">
      <router-view v-if="isRouterAlive"/>
    </transition>
    <mintNav v-show="showOrHideNav()"/>
  </div>
</template>

<script>
import mintNav from './components/mint_nav/mint_nav'
import {mapState} from 'vuex'
// 引入调用本地存储的方法
// import localStorage from './localStorage'

export default {
  computed: {
    ...mapState(['isFocus', 'routerLoading'])
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      transitionName: ''
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
      if (navArr.indexOf(path) >= 0 && !this.isFocus) {
        return true
      } else {
        return false
      }
    }
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
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
  .routerLoading{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    font-size: 28px;
    line-height: 100vh;
    text-align: center;
    z-index: 99999;
  }
  .slide-right-enter-active, .slide-right-leave-active{
    transition: all .7s;
  }
  .slide-right-enter, .slide-right-leave-to{
    transform: translateX(100%);
    opacity: 0
  }
  .slide-left-enter-active, .slide-left-leave-active{
    transition: all .7s;
  }
  .slide-left-enter, .slide-left-leave-to{
    transform: translateX(-100%);
    opacity: 0
  }
}
</style>
