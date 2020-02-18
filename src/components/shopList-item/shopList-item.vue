<template>
  <div class="shopListContainer">
    <ul class="shopWrapper"  v-if="shopList.length">
      <li class="shopItem" @click="goShop(shop)" v-for="(shop, index) in shopList" :key="index">
        <div class="shopLeft">
          <img class="shopImg" v-lazy="'../../../static/shopImgs/'+[index+1]+'.jpg'" alt="">
        </div>
        <div class="shopRight">
          <div class="top ellipsis">
            <p class="shopName">
              <span class="litTitle">品牌</span>
              <span class="name">{{shop.name}}</span>
            </p>
          </div>
          <div class="middle ellipsis">
            <stars :rating="shop.rating" :size="24"/>
            <p class="shopSalesCount">
              <span class="score">{{shop.rating}}</span>
              <span class="count">月售{{shop.recent_order_num}}单</span>
            </p>
            <p class="supperts">
              <span v-for="supItem in shop.supports" :key="supItem.id" :style="'backgroundColor: #'+supItem.icon_color">{{supItem.icon_name}}</span>
            </p>
          </div>
          <div class="bottom ellipsis">
            <p class="shopPrice">
              <span class="price">¥{{shop.float_minimum_order_amount}} /</span>
              <span class="expressage">{{shop.piecewise_agent_fee.tips}}</span>
            </p>
            <p class="deliveryStyle">
              <span class="hummingbird">蜂鸟专送</span>
              <span class="onTimeArrive">准时达</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <img src="./imgs/shop_back.svg" v-for="index in 5" :key="index" v-else>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import stars from '../stars/stars'

export default {
  components: {stars},
  data () {
    return {
      baseImgUrl: 'http://elm.cangdu.org/img/'
    }
  },
  computed: {
    ...mapState(['shopList'])
  },
  methods: {
    goShop (param) {
      let shopId = param.id
      // this.$router.push({path: '/shop/shopGoods', query: {id: shopId}})
      this.$router.push({path: '/shop?id=' + shopId})
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixins.less";
.shopItem{
  height: 80px;
  // overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 15px 5px;
  background-color: #fff;
  margin-top: 1px;
  .shopLeft{
    flex: 2;
    img{
      width: 80px;
      height: 80px;
    }
  }
  .shopRight{
    flex: 22;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 15px;
    color: #666;
    padding: 0 10px;
    .top{
      .shopName{
        .litTitle{
          background-color: @yellow;
          color: #111;
        }
        .name{
          font-size: 18px;
          line-height: 1.2;
          font-weight: bold;
          color: #111;
        }
      }
    }
    .middle{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .shopSalesCount{
        .score{
          // background-color: rgb(255, 235, 255);
          color: @yellow;
          vertical-align: middle;
          margin-left: -25px;
        }
        .count{
                    font-size: 14px;
          vertical-align: middle;
        }
      }
      .supperts{
              font-size: 14px;
        span{
          display: inline-block;
          color: #fff;
          padding: 2px;
          vertical-align: middle;
          margin-left: 3px;
        }
      }
    }
    .bottom{
      width: 100%;
      height: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .shopPrice{
        font-size: 14px;
      }
      .deliveryStyle{
        font-size: 12px;
        line-height: 12px;
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
    @media only screen and (max-width: 365px) {
      .top{
        .shopName{
          .litTitle{
            font-size: 14px;
          }
          .name{
            font-size: 15px;
          }
        }
      }
      .middle{
        .shopSalesCount{
          .score{
            font-size: 10px;
            margin-left: 0px;
          }
          .count{
            font-size: 12px;
          }
        }
        .supperts{
          font-size: 12px;
        }
      }
      .bottom{
        .shopPrice{
          font-size: 12px;
        }
        .deliveryStyle{
          font-size: 10px;
          line-height: 10px;
        }
      }
    }
  }
}
</style>
