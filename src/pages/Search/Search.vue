<template>
  <div class="searchContainer">
    <topTitle title='搜索'/>
    <div class="searchContentContainer">
      <div class="searchWrapper">
        <input type="text" class="searchItem" placeholder="搜索" v-model="searchVal">
        <button class="searchBtn" @click="searchHandler">搜索</button>
      </div>
    </div>
    <section class="list" v-if="!startSearch">
      <ul class="list_container">
        <!--:to="'/shop?id='+item.id"-->
        <router-link :to="{path:'/shop', query:{id:item.id}}" tag="li" v-for="item in searchShops" :key="item.id" class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p class="ellipsis">
                <span style="font-size: 16px; color: #000">{{item.name}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import topTitle from '../../components/top_title/top_title'
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
export default {
  // inject: ['reload'],
  data () {
    return {
      searchVal: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      startSearch: false
    }
  },
  computed: {
    ...mapState(['searchShops'])
  },
  mounted () {
    // this.reload()
    this._initScroll()
  },
  beforeDestroy () {
    this.$store.dispatch('clearSearchShops')
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        if (!this.searchScroll) {
          this.searchScroll = new BScroll('.list', {
            click: true
          })
        } else {
          this.searchScroll.refresh()
        }
      })
    },
    searchHandler () {
      console.log('搜索中')
      let keyword = this.searchVal.trim()
      if (keyword) {
        this.$store.dispatch('reqSearchShopList', keyword)
      }
    }
  },
  watch: {
    searchShops (value) {
      if (!value.length) { // 没有数据
        this.startSearch = true
      } else { // 有数据
        this.startSearch = false
      }
      this._initScroll()
    }
  },
  components: {topTitle}
}
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixins.less";
.searchContainer{
  background-color: #eee;
  width: 100%;
  height: 100%;
  .searchContentContainer{
    padding-top: 50px;
    .searchWrapper{
      display: flex;
      flex-direction: row;
      padding: 8px;
      background-color: #fff;
      .searchItem{
        width: 80%;
        height: 35px;
        background-color: #eee;
        outline:none;
        border-radius: 3px;
        padding-left: 10px;
      }
      .searchBtn{
        width: 18%;
        height: 35px;
        background-color: #02a774;
        margin-left: 8px;
        border: none;
        border-radius: 2px;
        color: white;
        line-height: 35px;
        text-align: center;
        font-size: 16px;
        outline: none;
        &:active{
          opacity: .5;
        }
      }
    }
  }
  .list{
    height: calc(100vh - 151px);
    overflow: hidden;
    .list_container{
      background-color: #fff;
      .list_li{
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid #eee;
        // overflow: hidden;
        .item_left{
          margin-right: 10px;
          .restaurant_img{
            width: 50px;
            height: 50px;
            display: block;
          }
        }
        .item_right{
          font-size: 12px;
          flex: 1;
          .item_right_text{
            color: #777;
            p{
              line-height: 20px;
              margin-bottom: 6px;
              width: 295px;
              &:last-child{
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  .search_none{
    margin: 0 auto;
    color: #333;
    text-align: center;
    margin-top: 0.125rem;
  }
}
</style>
