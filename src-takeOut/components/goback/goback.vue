<template>
    <span class="gobackBtn iconfont icon-zuojiantou_huaban" @click="goBack"></span>
</template>

<script>
export default {
  methods: {
    goBack () {
      console.log('返回')
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
