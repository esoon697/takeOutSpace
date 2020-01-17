<template>
  <div class="topTitleContainer">
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" rel="stylesheet/less">
@themeColor: #343434;
.topTitleContainer {
  width: 100%;
  height: 50px;
  display: flex;
  background-color: @themeColor;
  color: white;
  .centerPart, .leftPart, .rightPart{
    line-height: 50px;
    font-size: 20px;
    text-align: center;
  }
  .centerPart{
    flex: 10;
    font-size: 18px;
  }
  .leftPart{
    flex: 1;
    font-weight: bold;
  }
  .rightPart{
    flex: 1;
  }
}
</style>
