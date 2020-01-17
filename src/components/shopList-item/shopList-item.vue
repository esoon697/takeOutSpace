<template>
  <div class="shopWrapper" @click="goShop">
    <div class="shopLeft">
      <img class="shopImg" src="./imgs/shop/2.jpg" alt="">
    </div>
    <div class="shopCenter">
      <div class="shopName">
        <span class="litTitle">品牌</span>
        <span class="name">老王食堂</span>
        </div>
      <div class="shopSalesCount">
        <span class="score">4.6</span>
        <span class="count">月售1668单</span>
        </div>
      <div class="shopPrice">
        <span class="price">¥20 /</span>
        <span class="expressage">配送费约¥20</span>
      </div>
    </div>
    <div class="shopRight">
      <div class="supperts">
        <span>保</span>
        <span>票</span>
        <span>证</span>
      </div>
      <div class="deliveryStyle">
        <span class="hummingbird">蜂鸟专送</span>
        <span class="onTimeArrive">准时达</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['index'],
  methods: {
    goShop () {
      console.log(this.index)
      let index = this.index
      this.$router.push({name: 'shop', params: {index}})
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.shopWrapper{
  width: 100%;
  height: 80px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 15px 0 15px;
  border-bottom: 1px solid #eee;
  .shopLeft{
    flex: auto;
    img{
      width: 80px;
      height: 80px;
    }
  }
  .shopCenter{
    flex: 8 8 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 15px;
    color: #666;
    padding: 0 10px;
    .shopName{
      .litTitle{
        background-color: rgb(250, 170, 0);
        color: #111;
      }
      .name{
        font-size: 18px;
        font-weight: bold;
        color: #111;
      }
    }
    .shopSalesCount{
      margin-bottom: -10px;
      .score{
        background-color: rgb(255, 235, 255);
        vertical-align: middle;
      }
      .count{
        font-size: 14px;
        vertical-align: middle;
      }
    }
    .shopPrice{
      font-size: 14px;
    }
  }
  .shopRight{
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    margin-left: 25px;
    .supperts{
      font-size: 16px;
      span{
        display: inline-block;
        background-color: #eee;
        color: #888;
        padding: 2px;
      }
    }
    .deliveryStyle{
      font-size: 14px;
      margin-bottom: 26px;
      .hummingbird{
        color: #fff;
        background-color: #02a774;
        padding: 0 3px;
        border-radius: 3px;
      }
      .onTimeArrive{
        color: #02a774;
        border: 1px solid #02a774;
        padding: 0 3px;
        border-radius: 3px;
      }
    }
  }
}
</style>
