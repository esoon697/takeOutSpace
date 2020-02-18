<template>
  <nav class="topTitleContainer">
    <slot name="left"></slot>
    <span class="centerPart ellipsis" :title="title">{{title}}</span>
    <slot name="right"></slot>
  </nav>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" rel="stylesheet/less">
// .topTitleContainer-fixed{
//   width: 100%;
// }
.topTitleContainer {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #02a774;
  color: white;
  position: fixed;
  z-index: 999;
  .centerPart{
    width: 40%;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
  }
  .leftPart{
    font-size: 20px;
    line-height: 50px;
    margin-left: -15px;
  }
  .rightPart{
    font-size: 16px;
    line-height: 50px;
    margin-right: -15px;
  }
}
</style>
