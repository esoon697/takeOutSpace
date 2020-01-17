<template>
  <div class="gobackBtn" @click="goBack">
    <span class="iconfont icon-zuojiantou_huaban"></span>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      console.log('返回')
      this.$router.go(-1)
      // window.history.back()
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.gobackBtn{
  position: fixed;
  top: 10px;
  left: 5px;
  .iconfont{
    font-size: 16px;
    color: #aaa;
  }
}
</style>
