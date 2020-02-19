<template>
  <div class="orderContainer">
    <topTitle title='订单'/>
    <div class="orderContentContainer">
      <div class="orderWrapper-login" v-if="login">
        <!-- <span>已登录</span> -->
        <section class="list">
          <ul class="list_container">
            <!--:to="'/shop?id='+item.id"-->
            <li v-for="(order, index) in orders" :key="index" class="list_li" :class="{isMove: isMove && moveIndex === index}">
              <section class="item" @touchstart.capture="touchStart(index)" @touchend.capture="touchEnd(index)">
                <div class="item_text"  @click="skip(index)">
                  <p class="ellipsis" style="fontWeight: bold">
                    <span style="font-size: 16px; color: #000">{{userinfo.name || userinfo.phone}}</span>
                  </p>
                  <p class="orderMid">
                    <span>订单号: {{order.orderNum}}</span>
                    <span>{{order.orderNum | date-format}}</span>
                    </p>
                  <p style="color: red; font-size: 15px">￥{{order.total}}</p>
                </div>
                <div class="delete" @click="deleteItem(order)">删除</div>
              </section>
            </li>
          </ul>
        </section>
        <div class="search_none" v-show="!orders.length">暂无订单</div>
      </div>
      <div class="orderWrapper-noLogin" v-else>
        <img src="./imgs/order/person.png" alt="">
        <p>登录后查看订单</p>
        <button class="loginBtn generalBtn" @click="gotoLogin">立即登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import topTitle from '../../components/top_title/top_title'
import localStorage from '../../localStorage'
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      login: false,
      userinfo: {},
      startTouchX: 0,
      endTouchX: 0,
      isMove: false,
      moveIndex: ''
    }
  },
  computed: {
    ...mapState(['orders']),
    offsetX () {
      return this.startTouchX - this.endTouchX
    }
  },
  mounted () {
    this.userinfo = localStorage.get('userinfo')
    if (Object.keys(this.userinfo).length) {
      this.login = !this.login
    }
    let orders = localStorage.get('orders')
    this.$store.dispatch('saveOrder', orders)
    this._initScroll()
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        if (this.login) {
          if (!this.searchScroll) {
            this.searchScroll = new BScroll('.list', {
              click: true
            })
          } else {
            this.searchScroll.refresh()
          }
        }
      })
    },
    touchStart (index) {
      this.startTouchX = event.changedTouches[0].screenX
      this.moveIndex = index
    },
    touchEnd (index) {
      this.endTouchX = event.changedTouches[0].screenX
    },
    skip (index) {
      if (this.isMove) {
        this.isMove = false
        return
      }
      this.$router.push({path: '/shop', query: {id: index}})
    },
    deleteItem (order) {
      this.$store.dispatch('delOrder', order)
      this.isMove = false
    },
    gotoLogin () {
      this.$router.push('login')
    }
  },
  watch: {
    orders (value) {
      this._initScroll()
    },
    offsetX (value) {
      if (value > 100) {
        this.isMove = true
      } else if (value < 0) {
        this.isMove = false
      }
    }
  },
  components: {topTitle}
}
</script>

<style lang="less" rel="stylesheet/less">
@import "../../../static/css/common-style.less";
// @themeColor: #ff0;
.orderContainer{
  background-color: #eee;
  height: 100%;
  .orderContentContainer{
    height: 100%;
    padding-top: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .orderWrapper-noLogin{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p{
        color: #666;
        font-size: 16px;
      }
      .loginBtn{
        margin-top: 10px;
        width: 90px;
        border-radius: 5px;
      }
    }
    .orderWrapper-login{
      width: 100%;
      color: #02a774;
      .list{
        width: 100%;
        height: calc(100vh - 50px);
        overflow: hidden;
        .list_container{
          background-color: #fff;
          .list_li{
            display: flex;
            padding: 10px;
            border-bottom: 1px solid #eee;
            transition: all .5s;
            // overflow: hidden;
            .item{
              width: 100%;
              font-size: 12px;
              .item_text{
                width: 100%;
                color: #777;
                p{
                  line-height: 16px;
                  margin-bottom: 6px;
                  width: 320px;
                  &:last-child{
                    margin-bottom: 0;
                  }
                }
                .orderMid{
                  display: flex;
                  justify-content: space-between;
                }
              }
            .delete{
              width: 4rem;
              height: 100%;
              background: #ff4949;
              font-size: 17px;
              color: #fff;
              text-align: center;
              line-height: 81px;
              position: absolute;
              top:0;
              right: -4rem;
              }
            }
          }
          .isMove{
            transform: translateX(-4rem)
          }
        }
      }
      .search_none{
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: auto;
        color: #333;
        text-align: center;
        margin-top: 0.125rem;
      }
    }
  }
}
</style>
