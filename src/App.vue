<template>
  <div class="appContainer">
    <router-view/>
    <mintNav v-show="showOrHideNav()"/>
  </div>
</template>

<script>
import mintNav from './components/mint_nav/mint_nav'

export default {
  data () {
    return {
    }
  },
  methods: {
    showOrHideNav () {
      let navArr = ['/home', '/search', '/order', '/profile']
      let path = this.$route.path
      console.log(path)
      if (navArr.indexOf(path) >= 0) {
        return true
      } else {
        return false
      }
    }
  },
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
