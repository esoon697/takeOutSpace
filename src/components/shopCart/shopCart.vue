<template>
<div class="shopCartContainer">
    <div class="shopCartWrapper">
    <div class="Left">
      <div class="iconOuter" @click="shopCartListChange">
        <div class="iconInner" :class="{iconInnerActive:total}">
          <i class="iconfont icon-gouwuche_huaban"></i>
          <div class="cartCount" v-show="cartCount">{{cartCount}}</div>
        </div>
      </div>
      <div class="shopCartInfo">
        <p class="total">￥{{total}}</p>
        <span class="expressFee">另需配送费￥{{info.deliveryPrice}}元</span>
      </div>
    </div>
    <div class="right" :class="{rightActive:(info.minPrice-total)<=0}">
      <p class="ellipsis" v-if="(info.minPrice-total)>0">
        <span v-if="!total">￥{{info.minPrice}}起送</span>
        <span v-else>还差￥{{info.minPrice-total}}元起送</span>
      </p>
      <span v-else @click="payOrder">结算</span>
    </div>
    <transition name="fade">
      <div class="shopCartList" v-show="isShowList">
        <p class="listHeader">
          <span class="headerLeft">购物车</span>
          <span class="headerRight" @click="clearShopCart">清空</span>
        </p>
        <div class="listMain">
          <ul>
            <li v-for="(food, index) in shopCart" :key="index">
              <span class="itemName">{{food.name}}</span>
                <span class="price">￥{{food.price}}</span>
                <CartControl :food="food"/>
            </li>
          </ul>
        </div>
        <div class="listBg" v-show="isShowList" @click="shopCartListChange"></div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import CartControl from '../CartControl/CartControl'
import BScroll from 'better-scroll'
import {MessageBox} from 'mint-ui'
import Storage from '../../localStorage'
export default {
  props: {
    food: Object
  },
  data () {
    return {
      isShowList: false
    }
  },
  computed: {
    ...mapState(['shopCart', 'info']),
    total () {
      let total = 0
      this.shopCart.forEach(element => {
        total += element.count * element.price
      })
      return total
    },
    cartCount () {
      const {shopCart} = this
      let count = 0
      shopCart.forEach((food) => {
        count += food.count
      })
      return count
    }
  },
  methods: {
    shopCartListChange () {
      if (this.isShowList || this.total) {
        this.isShowList = !this.isShowList
        if (this.isShowList) {
          this.$nextTick(() => {
            if (!this.shopCartScroll) {
              this.shopCartScroll = new BScroll('.listMain', {
                click: true
              })
            } else {
              this.shopCartScroll.refresh()
            }
          })
        }
      }
    },
    clearShopCart () {
      MessageBox.confirm('是否清空购物车?').then(action => {
        this.$store.dispatch('clearShopCart')
        this.shopCartListChange()
      }, action => {})
    },
    payOrder () {
      MessageBox.confirm('确认是否购买?').then(action => {
        const {total} = this
        let orders = Storage.get('orders')
        if (!orders) {
          orders = []
        }
        let orderNum = Date.parse(new Date())
        let order = {'total': total, 'orderNum': orderNum}
        orders.push(order)
        Storage.save('orders', orders)
        // 清空购物车
        this.$store.dispatch('clearShopCart')
        this.shopCartListChange()
        this.$router.replace('/order')
      }, action => {})
    }
  },
  watch: {
    shopCart (value) {
      if (!value.length && this.isShowList) {
        this.isShowList = !this.isShowList
      }
    }
  },
  components: {CartControl}
}
</script>

<style lang='less' rel='stylesheet/less'>
@import '../../common/less/mixins';
.shopCartContainer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 10;
  .shopCartWrapper{
    // position: relative;
    // z-index: 10;
    width: 100%;
    display: flex;
    background-color: #141d27;
    color: rgba(255,255,255,0.4);
    .Left{
      flex: 1;
      display: flex;
      .iconOuter{
        position: relative;
        top: -10px;
        margin: 0 12px;
        z-index: 12;
        width: 60px;
        height: 60px;
        padding: 6px;
        box-sizing: border-box;
        background-color: #141d27;
        border-radius: 50%;
        .iconInner{
          width: 100%;
          height: 100%;
          line-height: 48px;
          background-color: #2b343c;
          border-radius: 50%;
          text-align: center;
          .icon-gouwuche_huaban{
            font-size: 24px;
            color: #80858a
          }
          .cartCount{
            position: absolute;
            top: 2px;
            right: 5px;
            width: 20px;
            height: 20px;
            font-size: 12px;
            text-align: center;
            color: #fff;
            line-height: 20px;
            border-radius: 50%;
            background-color: #f01414;
          }
        }
        .iconInnerActive{
          background-color: @green;
          .icon-gouwuche_huaban{
            color: #fff;
            background-color: @green;
          }
        }
      }
      .shopCartInfo{
        display: flex;
        flex-direction: column;
        .total{
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          line-height: 24px;
          margin: 5px;
        }
        .expressFee{
          font-size: 10px;
        }
      }
    }
    .right{
      width: 100px;
      background-color: #2b333b;
      text-align: center;
      line-height: 50px;
      font-size: 12px;
      font-weight: bold;
      color: #fff;
    }
    .rightActive{
      background-color: #00b43c;
    }
  }
  // .shopCartListWrapper{
  .shopCartList{
    width: 100%;
    position: absolute;
    z-index: 9;
    bottom: 50px;
    color: #fff;
    .listHeader{
      height: 40px;
      line-height: 40px;
      background-color: #f3f5f7;
      padding: 0 18px;
      display: flex;
      justify-content: space-between;
      .headerLeft{
        font-size: 14px;
        color: #07111b;
      }
      .headerRight{
        font-size: 12px;
        color: #00a0dc;
        line-height: 40px;
        text-align: center;
      }
    }
    .listMain{
      max-height: 200px;
      overflow: hidden;
      background-color: #fff;
      ul{
        li{
          height: 50px;
          line-height: 50px;
      background-color: #fff;
          padding: 0 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          .itemName{
            flex: 10;
            color: #07111b;
          }
          .price{
            flex: 2;
            color: #f01414;
            text-align: center;
          }
        }
      }
    }
    .listBg{
      width: 100%;
      height: 100vh;
      position: absolute;
      z-index: -1;
      bottom: 0;
      background-color: rgba(7,17,27,0.6);
      backdrop-filter: blur(10px);
      opacity: 1;
    }
  }
  .fade-enter-active{
    transition: all .5s;
  }
  .fade-enter{
    opacity: 0;
  }
  // }
}
</style>
