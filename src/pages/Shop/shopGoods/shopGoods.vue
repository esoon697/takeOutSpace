<template>
  <div class="shopGoodsContainer">
    <div class="goodsLeft">
      <ul>
        <li v-for="(good, index) in goods" :key="index" :class="{current: index === currentIndex}"
        @click="toScroll(index)">
          <img class="miniIcon" v-lazy="good.icon" v-show="good.icon">
          <span class="goodsClass">{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goodsRight">
      <div class="foodsWrapper">
        <div class="top-tip">
        <span class="refresh-hook">加载中</span>
        </div>
        <ul class="foodWrapper" v-for="(good, index) in goods" :key="index">
          <h3>{{good.name}}</h3>
          <li v-for="(food, index) in good.foods" :key="index" @click="showFood(food)" :id="'li'+index">
            <img class="goodImg" :src="food.icon">
            <div class="goodInfo">
              <p class="goodName">{{food.name}}</p>
              <p class="goodDescription">{{food.description}}</p>
              <p class="goodSell">
                <span class="sellCount">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </p>
              <div class="goodPrice">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
            </div>
            <div class="cartcontrol-wrapper">
              <CartControl :food="food"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Food :food="food" ref="food"/>
    <ShopCart :food="food"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
// import storage from '../../../localStorage'
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
import ShopCart from '../../../components/shopCart/shopCart'
export default {
  data () {
    return {
      currentScrollY: 0,
      foodsTypeTops: [],
      food: {}
    }
  },
  computed: {
    ...mapState(['goods']),
    currentIndex () {
      const {currentScrollY, foodsTypeTops} = this
      const index = foodsTypeTops.findIndex((foodsTypeTop, index) => {
        return currentScrollY >= foodsTypeTop && currentScrollY < foodsTypeTops[index + 1]
      })
      return index
    }
  },
  mounted () {
    // 由于异步更新数据,所以在数据更新完毕后才调用$nextTick
    // 对于异步执行的部分,可以在异步函数执行完毕之后在callback中执行$nextTick,或在watch监视数据变化后使用
    this.$store.dispatch('reqShopGoods', () => {
      // dom渲染结束后调用
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
        // this.currentScrollY = storage.get('currentScrollY', 'sessionStorage')
        // this.toScroll(this.currentIndex)
      })
    })
    // this.toScroll()
  },
  // beforeDestroy () {
  //   this.$store.dispatch('saveScrollY', this.currentScrollY)
  //   storage.save('currentScrollY', this.currentScrollY)
  // },
  methods: {
    // 初始化Bscroll对象
    _initScroll () {
      this.goodsLeftScroll = new BScroll('.goodsLeft', {
        click: true,
        probeType: 3,
        bounce: false
      })
      this.goodsRightScroll = new BScroll('.goodsRight', {
        // 下拉刷新配置
        pullDownRefresh: {
          threshold: 50,
          stop: 30
        },
        click: true,
        probeType: 3
      })
      // 给左侧绑定scroll滑动的监听
      this.goodsLeftScroll.on('scroll', ({x, y}) => {
        this.leftScrollY = Math.abs(y)
      })
      // this.goodsLeftScroll.on('scrollEnd', ({x, y}) => {
      //   console.log('goodsLeftScroll', x, y)
      //   this.leftScrollY = y
      // })
      // 给右侧列表绑定scroll滑动的监听,实时获取当前位置的坐标
      this.goodsRightScroll.on('scroll', ({x, y}) => {
        // console.log('scroll', x, y)
        this.currentScrollY = Math.abs(y)
        // storage.save('currentScrollY', this.currentScrollY, 'sessionStorage')
      })
      // 给右侧列表绑定scroll结束的监听
      // this.goodsRightScroll.on('scrollEnd', ({x, y}) => {
      //   // console.log('scrollEnd', x, y)
      //   this.currentScrollY = Math.abs(y)
      // })
      // 下拉刷新
      this.goodsRightScroll.on('pullingDown', () => {
        this.$store.dispatch('reqShopGoods', () => {
          this.$nextTick(() => {
            // this._initScroll()
            // this._initTops()
            setTimeout(() => {
              this.goodsRightScroll.finishPullDown()
            }, 1000)
          })
        })
      })
    },
    // 初始化Bscroll对象
    _initTops () {
      let foodWrappers = document.querySelectorAll('.foodWrapper')
      let topClientHeight = 0
      this.foodsTypeTops.push(0)
      foodWrappers.forEach((foodWrapper) => {
        topClientHeight += foodWrapper.clientHeight
        this.foodsTypeTops.push(topClientHeight)
      })
    },
    toScroll (index) {
      let targetScrollY = this.foodsTypeTops[index]
      this.currentScrollY = targetScrollY
      this.goodsRightScroll.scrollTo(0, -targetScrollY, 300)
    },
    // 显示点击的food
    showFood (food) {
      // 设置food
      this.food = food
      // 显示food组件 (在父组件中调用子组件对象的方法)
      this.$refs.food.toggleShow()
    }
  },
  watch: {
    currentIndex (value) {
      this.$nextTick(() => {
        // 单个左侧商品分类模块的高度
        let currentHeight = document.querySelector('.current').clientHeight
        // 左侧商品分类模块可显示高度
        let goodsLeftHeight = document.querySelector('.goodsLeft').clientHeight
        // 左侧商品分类模块不能显示部分高度
        let unShowHeight = Math.abs(this.goodsLeftScroll.maxScrollY)
        console.log(unShowHeight)
        // 左侧所有分类模块高度
        let currentsHeight = (value + 1) * currentHeight
        // 当前滑动方向
        let directionY = this.goodsRightScroll.directionY
        if (!this.leftScrollY) {
          this.leftScrollY = 0
        }
        if ((currentsHeight + (goodsLeftHeight / 2)) >= goodsLeftHeight && directionY === 1 && this.leftScrollY !== unShowHeight) {
          this.goodsLeftScroll.scrollBy(0, -currentHeight, 300)
        } else if ((currentsHeight - (goodsLeftHeight / 2)) <= unShowHeight && directionY === -1 && this.leftScrollY !== 0) {
          this.goodsLeftScroll.scrollBy(0, currentHeight, 300)
        }
      })
    }
  },
  components: {CartControl, Food, ShopCart}
}
</script>

<style lang='less' rel='stylesheet/less'>
@import "../../../common/less/mixins.less";
.shopGoodsContainer{
  display: flex;
  width: 100%;
  height: calc(100vh - 248px);
  background: #fff;
  overflow: hidden;
  .goodsLeft{
    width: 80px;
    background-color: #f3f5f7;
    li{
      height: 50px;
      line-height: 50px;
      text-align: center;
      .bottom-border-1px(rgba(7, 17, 27, 0.1));
      .miniIcon{
        width: 12px;
        height: 12px;
        vertical-align: middle;
      }
      .goodsClass{
        font-size: 12px;
        vertical-align: middle;
      }
    }
    .current{
      margin-top: -1px;
      background: #fff;
      color: @green;
      font-weight: 700;
    }
  }
  .goodsRight{
    flex: 1;
    .top-tip{
      position: absolute;
      top: -40px;
      left: 0;
      z-index: 1;
      width: 100%;
      height:40px;
      line-height:40px;
      text-align:center;
      color: #555;
    }
    ul{
      h3{
        background-color: #f3f5f7;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        color: #93999f;
        border-left: 2px solid #d9dde1;
        padding-left: 15px;
      }
      li{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .bottom-border-1px(rgba(7, 17, 27, 0.1));
        &:last-child{
          margin-bottom: 0;
        }
        .goodImg{
          width: 57px;
          height: 57px;
          margin-right: 10px;
        }
        .goodInfo{
          flex: 1;
          .goodName{
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .goodDescription,.goodSell{
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .goodDescription{
            line-height: 12px;
            margin-bottom: 8px;
          }
          .goodSell{
            line-height: 12px;
            margin-bottom: 8px;
            .sellCount{
              margin-right: 12px;
            }
          }
          .goodPrice{
            font-weight: bold;
            line-height: 24px;
            .new{
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old{
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
        }
        .cartcontrol-wrapper{
          position: absolute;
          bottom: 12px;
          right: 12px;
        }
      }
    }
  }
}
</style>
