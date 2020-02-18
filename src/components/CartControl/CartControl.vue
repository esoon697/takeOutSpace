<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-ziyuan1" v-show="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="iconfont icon-wuuiconxiangjifangda" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: {
    food: Object
  },
  computed: {
    ...mapState(['shopCart'])
  },
  methods: {
    updateFoodCount (isAdd) {
      this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less'>
@import "../../common/less/mixins.less";
.cartcontrol{
  display: flex;
  font-size: 0;
  position: relative;
  .cart-decrease{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
  .icon-ziyuan1{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: @green;
  }
  .move-enter-active, &.move-leave-active{
    transition: all .3s;
  }
  .move-enter, &.move-leave-to{
    opacity: 0;
    transform: translateX(15px) rotate(180deg);
  }
  .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .icon-wuuiconxiangjifangda{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: @green;
  }
}
</style>
