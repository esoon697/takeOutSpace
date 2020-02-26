<template>
  <div class="shopContainer">
    <nav class="shopHeader" :style="{backgroundImage: `url(${info.bgImg})`}">
      <goback class="backBtn"/>
    </nav>
    <div class="shopContent">
      <img class="shopAvatar" :src="info.avatar">
      <div class="headerContent">
        <h2 class="contentTitle" @click="showShopInfoDetail">
          <span class="left">品牌</span>
          <span class="center">{{info.name}}</span>
          <span class="right">
            <i class="iconfont icon-youbian-tianchong"></i>
          </span>
        </h2>
        <div class="shopInfo">
          <span class="shopMessageDetail">{{info.score}}</span>
          <span class="shopMessageDetail">月售{{info.sellCount}}单</span>
          <span class="shopMessageDetail">{{info.description}}</span>
          <span class="shopMessageDetail">约{{info.deliveryTime}}分钟</span>
          <span class="shopMessageDetail">距离{{info.distance}}</span>
        </div>
        <div class="shopDiscounts" @click="showShopDiscountsDetail" v-if="info.supports">
          <span class="miniTag" :class="activesBgcolor[info.supports[0].type]">{{info.supports[0].name}}</span>
          <span class="activityContent ellipsis">{{info.supports[0].content}}</span>
          <span class="discountsCount">{{info.supports.length}}个优惠</span>
          <span>
            <i class="iconfont icon-icon-test7"></i>
          </span>
        </div>
      </div>
      <!-- 商家信息浮窗 -->
      <transition name="fade">
        <div class="shopInfoDetail" v-show="shopInfoDetailState" @click.stop="showShopInfoDetail">
          <div class="InfoDetailMain" @click ="showShopInfoDetail">
            <h2 class="contentTitle">
              <span class="left">品牌</span>
              <span class="center">{{info.name}}</span>
            </h2>
            <ul class="modalMsg">
              <li>
                <h3>{{info.score}}</h3>
                <p>评分</p>
              </li>
              <li>
                <h3>{{info.sellCount}}单</h3>
                <p>月售</p>
              </li>
              <li>
                <h3>{{info.description}}</h3>
                <p>约{{info.deliveryTime}}分钟</p>
              </li>
              <li>
                <h3>{{info.deliveryPrice}}元</h3>
                <p>配送费用</p>
              </li>
              <li>
                <h3>{{info.distance}}</h3>
                <p>距离</p>
              </li>
            </ul>
            <p class="noticeTitle">
              <span>公告</span>
            </p>
            <div class="noticeContent">
                {{info.bulletin}}
              </div>
          </div>
          <div class="InfoDetailClose" @click.self="showShopInfoDetail">
            <i class="iconfont icon-ziyuan"></i>
          </div>
        </div>
      </transition>
      <!-- 商家活动浮窗 -->
      <v-touch v-on:swipeup="showShopDiscountsDetail">
        <transition name="fadeTop">
          <div class="shopDiscountsDetail" v-show="discountsDetailState">
            <div class="discountsDetailMain">
              <h2 class="detailMainTitle">优惠活动</h2>
              <ul>
                <li v-for="(support, index) in info.supports" :key="index">
                  <span class="activeName" :class="activesBgcolor[support.type]">{{support.name}}</span>
                  <span class="activeContent">{{support.content}}</span>
                </li>
              </ul>
                <div class="discountsDetailClose" @click="showShopDiscountsDetail">
                  <i class="iconfont icon-icon-test"></i>
                </div>
            </div>
            <div class="closeArea" @click="showShopDiscountsDetail"></div>
          </div>
        </transition>
      </v-touch>
    </div>

    <div class="shopTab">
      <div class="tabItem">
        <router-link to="/shop/shopGoods" replace>点餐</router-link>
      </div>
      <div class="tabItem">
        <router-link to="/shop/shopRatings" replace>评价</router-link>
      </div>
      <div class="tabItem">
        <router-link to="/shop/shopInfo" replace>商家</router-link>
      </div>
    </div>
    <div>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import goback from '../../components/goback/goback'
import { mapState } from 'vuex'
export default {
  components: {goback},
  data () {
    return {
      activesBgcolor: ['activity-green', 'activity-red', 'activity-orange'],
      shopInfoDetailState: false,
      discountsDetailState: false
    }
  },
  computed: {
    ...mapState(['goods', 'info', 'ratings'])
  },
  mounted () {
    this.$store.dispatch('reqShopGoods')
    this.$store.dispatch('reqShopInfo')
    this.$store.dispatch('reqShopRatings')
  },
  methods: {
    showShopInfoDetail () {
      this.shopInfoDetailState = !this.shopInfoDetailState
    },
    showShopDiscountsDetail () {
      this.discountsDetailState = !this.discountsDetailState
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less'>
@import "../../common/less/mixins.less";
// @green: #02a774;
// @yellow: #F5A100;
// @bgc: #e4e4e4;
.shopContainer{
  position: relative;
  .shopHeader{
    height: 50px;
    background-size: cover;
    background-repeat: no-repeat;
    .gobackBtn .iconfont{
      color: #fff;
    }
  }
  .shopContent{
    position: relative;
    padding-top: 35px;
    .shopAvatar{
      width: 60px;
      height: 60px;
      position: absolute;
      top: -30px;
      left: 0;
      right: 0;
      margin: auto;
    }
    .headerContent{
      display: flex;
      flex-direction: column;
      align-items: center;
      .contentTitle{
        .left{
          background-color: @yellow;
          font-size: 12px;
          padding: 2px;
          vertical-align: middle;
          margin-right: 5px;
        }
        .center{
          vertical-align: middle;
          font-size: 18px;
          font-weight: bold;
        }
        .right{
          vertical-align: middle;
          .iconfont{
            font-size: 16px;
          }
        }
      }
      .shopInfo{
        font-size: 12px;
        color: #555;
        padding: 5px;
      }
      .shopDiscounts{
        font-size: 12px;
        padding: 2px;
        border: 1px solid #ddd;
        color: #555;
        .miniTag{
          display: inline-block;
          // background-color: #70BC46;
          color: #fff;
          vertical-align: middle;
          padding: 2px;
          font-size: 12px;
        }
        .activityContent{
          width: 180px;
          display: inline-block;
          vertical-align: middle;
        }
        .iconfont{
          font-size: 16px;
          vertical-align: middle;
        }
      }
    }
    .shopInfoDetail{
      position: absolute;
      top: -50px;
      width: 100%;
      height: 100vh;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 20;
      .InfoDetailMain{
        width: 80%;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 20px;
        .contentTitle{
          .left{
            background-color: @yellow;
            font-size: 12px;
            padding: 2px;
            vertical-align: middle;
            margin-right: 5px;
          }
          .center{
            vertical-align: middle;
            font-size: 18px;
            font-weight: bold;
          }
          .right{
            vertical-align: middle;
            .iconfont{
              font-size: 16px;
            }
          }
        }
        .modalMsg{
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 20px -10px 0;
          li{
            // flex: 1;
            text-align: center;
            h3{
              font-size: 15px;
              font-weight: bold;
              color: #333;
              margin-bottom: 8px;
            }
            p{
              font-size:12px;
              color: #999;
            }
          }
        }
        .noticeTitle{
            position: relative;
            text-align: center;
            margin: 15px auto;
            width: 85px;
            background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
            background-size: 100% 1px;
            background-position: 50%;
            background-repeat: no-repeat;
            span{
              font-size: 12px;
              padding: 0 6px;
              color: #999;
              background-color: #fff;
            }
        }
        .noticeContent{
          text-indent: 1rem;
          font-size: 13px;
          line-height: 1.54;
          color: #333;
          overflow-y: auto;
        }
      }
      .InfoDetailClose{
        margin-top: 20px;
        .iconfont{
          color: #fff;
          font-weight: bold;
        }
      }
    }
    .fade-enter-active,.fade-leave-active{
      transition: all .5s
    }
    .fade-enter, .fade-leave-to{
      opacity: 0;
    }
    .shopDiscountsDetail{
      width: 100%;
      // height: 100vh;
      position: absolute;
      top: -50px;
      background-color: rgba(0,0,0,0);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      z-index: 20;
      .discountsDetailMain{
        position: relative;
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 0;
        z-index: 10;
        .detailMainTitle{
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        ul{
          li{
            margin-bottom: 12px;
            .activeName{
              font-size: 12px;
              color: #fff;
              padding: 2px 3px;
              border-radius: 2px;
            }
          }
        }
        .discountsDetailClose{
          position: absolute;
          width: 100%;
          text-align: center;
          bottom: 2px;
        }
      }
      .closeArea{
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0px;
        background-color: rgba(0,0,0,0.5);
        z-index: 9;
      }
    }
    .fadeTop-enter-active, .fadeTop-leave-active{
      transition: all .5s;
    }
    .fadeTop-enter, .fadeTop-leave-to{
      transform: translateY(-100Vh);
    }
    .activity-green{
      background-color: rgb(112, 188, 70);
    }
    .activity-red{
      background-color: rgb(240, 115, 115);
    }
    .activity-orange{
      background-color: rgb(241, 136, 79);
    }
  }
  .shopTab{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    color: #000;
    height: 40px;
    line-height: 40px;
    background: #fff;
    .bottom-border-1px(rgba(7, 17, 27, 0.1));
    .tabItem{
      text-align: center;
      font-size: 14px;
      color: rgb(77, 85, 93);
      flex: 1;
      a{
        display: block;
        position: relative;
      }
      .router-link-active{
        color: @green;
        &::after{
          content: '';
          position: absolute;
          left: 50%;
          bottom: 1px;
          width: 35px;
          height: 2px;
          transform: translateX(-50%);
          background: @green;
        }
      }
    }
  }
}
</style>
