<template>
  <div class="btmNavComtainer">
    <ul>
      <li><a href="javascript:;" @click="gotoNav('home')">首页</a></li>
      <li><a href="javascript:;" @click="gotoNav('search')">搜索</a></li>
      <li><a href="javascript:;" @click="gotoNav('order')">订单</a></li>
      <li><a href="javascript:;" @click="gotoNav('profile')">个人</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['gotoNav']

}
</script>

<style>
.btmNavComtainer ul {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  list-style: none;
}
.btmNavComtainer ul li a {
  text-decoration: none
}
</style>
