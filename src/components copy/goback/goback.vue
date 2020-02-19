<template>
  <div class="gobackBtn" @click="goBack(url)">
    <span class="iconfont icon-zuojiantou_huaban"></span>
  </div>
</template>

<script>
export default {
  props: ['url'],
  methods: {
    goBack (url) {
      console.log(url)
      if (url) {
        this.$router.replace(url)
      } else {
        this.$router.go(-1)
      }
      // window.history.back()
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.gobackBtn{
  position: fixed;
  top: 15px;
  left: 10px;
  .iconfont{
    font-size: 16px;
    color: #aaa;
  }
}
</style>
