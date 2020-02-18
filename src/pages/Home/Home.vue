<template>
  <div class="homeContainer">
    <div class="homeRouterContainer" v-if="$route.path==='/home'">
      <!-- 首页头部 -->
      <topTitle :title='address.address'>
        <span class="leftPart" slot="left" @click="gotoSearch('/search')">
          <li class="iconfont icon-sousuo_huaban"></li>
        </span>
        <span class="rightPart" slot="right" @click="goLogin">
          <span v-if="!loginState">登录注册</span>
          <span v-else><li class="iconfont icon-yonghudianji"></li></span>
        </span>
      </topTitle>
      <!-- 首页内容 -->
      <div class="homeContentContainer">
        <!-- 首页导航栏 -->
        <div class="swiperContainer">
          <mt-swipe :auto="0" @change="handleChange" v-if="foodArr.length">
            <mt-swipe-item v-for="(foodPage, index) in foodArr" :key="index">
              <div class="swiperWrapper">
                <div class="navWraper" v-for="item in foodPage" :key="item.id">
                  <img :src="baseImageUrl+item.image_url" alt="">
                  <span class="ellipsis">{{item.title}}</span>
                </div>
              </div>
            </mt-swipe-item>
          </mt-swipe>
          <img src="./imgs/msite_back.svg" v-else>
        </div>
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
            <shopListItem/>
            <div class="shopListLoading">
              <mt-spinner type="triple-bounce" color="#02a774"></mt-spinner>
            </div>
          </div>
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
import {mapState} from 'vuex'
import localStore from '../../localStorage'

export default {
  components: {topTitle, shopListItem},
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com',
      loginState: false
    }
  },
  computed: {
    ...mapState(['foodList', 'address', 'shopList']),
    // 将返回的食品分类数组转化为最大长度为8的二维数组
    foodArr () {
      let {foodList} = this
      // 声明一个二维数组
      let arr = []
      // 声明一个空的最小数组
      let minArr = []
      foodList.forEach(element => {
        // 当最小数组内的长度等于8时,声明一个新的最小数组
        if (minArr.length === 8) {
          minArr = []
        }
        // 当最小数组为空时push到二维数组内
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 每次遍历数组都会将元素push到最小数组中
        minArr.push(element)
      })
      return arr
    }
  },
  mounted () {
    // 获取当前地址
    this.$store.dispatch('getAddress')
    // 获取食品分类
    this.$store.dispatch('getFoodList')
    // 获取商铺列表
    this.$store.dispatch('getShopList')
    // 判断用户是否登录
    let userinfo = localStore.get('userinfo')
    if (Object.keys(userinfo).length) {
      this.loginState = !this.loginState
    }
  },
  methods: {
    handleChange (index) {
      console.log(index)
    },
    goLogin () {
      if (!this.loginState) {
        this.$router.push('login')
      }
    },
    gotoSearch (path) {
      this.$router.replace(path)
    }
  }
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
      overflow: hidden;
      border-bottom: 12px solid #eee;
      .swiperWrapper{
        width: 100%;
        height: 92%;
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        align-items: flex-start;
        align-content: space-around;
        overflow: hidden;
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
        background-color: #eee;
        // padding: 0 5px;
      }
      .shopListLoading{
        text-align: center;
        height: 30px;
        line-height: 30px;
        background-color: #eee;
      }
    }
  }
}
</style>
