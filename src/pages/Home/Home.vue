<template>
  <div class="homeContainer">
    <div class="homeRouterContainer" v-if="$route.path==='/home'?true:false">
      <!-- 首页头部 -->
      <topTitle title='四川省达州市达川区中华花园'>
        <span class="leftPart" slot="left">
          <li class="iconfont icon-sousuo_huaban"></li>
        </span>
        <span class="rightPart" slot="right" @click="goLogin">登录注册</span>
      </topTitle>
      <!-- 首页内容 -->
      <div class="homeContentContainer">
        <!-- 首页导航栏 -->
        <mt-swipe class="swiperContainer" :auto="0" @change="handleChange">
          <mt-swipe-item>
            <div class="swiperWrapper">
              <div class="navWraper">
                <img src="./imgs/nav/1.jpg" alt="">
                <span class=" ellipsis">甜品饮料</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/2.jpg" alt="">
                <span class=" ellipsis">特色美食</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/3.jpg" alt="">
                <span class=" ellipsis">药品</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/4.jpg" alt="">
                <span class=" ellipsis">送货到家</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/5.jpg" alt="">
                <span class=" ellipsis">生鲜</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/6.jpg" alt="">
                <span class=" ellipsis">蛋糕</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/7.jpg" alt="">
                <span class=" ellipsis">奶茶</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/8.jpg" alt="">
                <span class=" ellipsis">尊贵体验</span>
              </div>
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
                      <div class="swiperWrapper">
              <div class="navWraper">
                <img src="./imgs/nav/9.jpg" alt="">
                <span class=" ellipsis">甜品饮料</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/10.jpg" alt="">
                <span class=" ellipsis">特色美食</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/11.jpg" alt="">
                <span class=" ellipsis">药品</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/12.jpg" alt="">
                <span class=" ellipsis">送货到家</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/13.jpg" alt="">
                <span class=" ellipsis">生鲜</span>
              </div>
              <div class="navWraper">
                <img src="./imgs/nav/14.jpg" alt="">
                <span class=" ellipsis">蛋糕</span>
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <!-- 商家列表 -->
        <div class="shopContainber">
          <!-- 商家列表头部 -->
          <div class="shopTitle">
            <span class="titleIcon">
              <i class="iconfont icon-gengduo"></i>
            </span>
            <span class="titleText">附近商家</span>
          </div>
          <!-- 商家列表 -->
          <div class="shopList">
            <shopListItem :index="1"/>
            <shopListItem :index="2"/>
            <shopListItem :index="3"/>
            <shopListItem />
            <shopListItem/>
            <shopListItem/>
          </div>
          <div class="shopListLoading">加载中...</div>
        </div>
      </div>
    </div>
    <div class="shopRouterContainer" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import topTitle from '../../components/top_title/top_title'
import shopListItem from '../../components/shopList-item/shopList-item'

export default {
  data () {
    return {
    }
  },
  methods: {
    handleChange (index) {
      console.log(index)
    },
    goLogin () {
      this.$router.push('login')
    }
  },
  components: {topTitle, shopListItem}
}
</script>

<style lang="less" rel="stylesheet/less">
.homeRouterContainer{
  .homeContentContainer{
    padding: 50px 0;
    background-color: #fff;
    .swiperContainer{
      width: 100%;
      height: 200px;
      border-bottom: 12px solid #eee;
      .swiperWrapper{
        width: 100%;
        height: 92%;
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        align-items: flex-start;
        align-content: space-around;
        .navWraper{
          width: 20%;
          padding: 2.5%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          align-items: center;
          img{
            width: 50px;
            height: 50px;
            margin-bottom: 5px;
          }
          span{
            width: 100%;
            font-size: 14px;
            color: #999;
            text-align: center;
          }
        }
      }
      span{
        display: block;
      }
      .mint-swipe-indicator.is-active{
        background-color: #02a774;
        opacity: .8;
      }
    }
    .shopContainber{
      .shopTitle{
        padding: 15px 0 0;
        .titleIcon{
          .iconfont{
            font-size: 18px;
            vertical-align: middle;
            color: #999;
            margin-left: 5px;
          }
        }
        .titleText{
          .titleIcon.iconfont;
          font-size: 12px;
        }
      }
      .shopList{
        padding: 0 5px;
      }
      .shopListLoading{
        text-align: center;
        line-height: 30px;
        height: 30px;
        background-color: #eee;
        color: #999;
        font-size: 14px;
      }
    }
  }
}
.homeContentContainer{
  padding: 50px 0;
  .swiperContainer{
    width: 100%;
    height: 200px;
    border-bottom: 12px solid #eee;
    .swiperWrapper{
      width: 100%;
      height: 92%;
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      align-items: flex-start;
      align-content: space-around;
      .navWraper{
        width: 20%;
        padding: 2.5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        img{
          width: 50px;
          height: 50px;
          margin-bottom: 5px;
        }
        span{
          width: 100%;
          font-size: 14px;
          color: #999;
          text-align: center;
        }
      }
    }
    span{
      display: block;
    }
    .mint-swipe-indicator.is-active{
      background-color: #02a774;
      opacity: .8;
    }
  }
  .shopContainber{
    .shopTitle{
      padding: 15px 0 0;
      .titleIcon{
        .iconfont{
          font-size: 18px;
          vertical-align: middle;
          color: #999;
          margin-left: 5px;
        }
      }
      .titleText{
        .titleIcon.iconfont;
        font-size: 12px;
      }
    }
    .shopList{
      padding: 0 5px;
    }
    .shopListLoading{
      text-align: center;
      line-height: 30px;
      height: 30px;
      background-color: #eee;
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
