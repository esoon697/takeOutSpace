<template>
  <div class="searchContainer">
    <topTitle title='搜索'/>
    <div class="searchContentContainer">
      <div class="searchWrapper">
        <input type="text" class="searchItem" placeholder="搜索" v-model="searchVal">
        <button class="searchBtn" @click="searchHandler">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
import topTitle from '../../components/top_title/top_title'
export default {
  data () {
    return {
      searchVal: ''
    }
  },
  methods: {
    searchHandler () {
      console.log('搜索中')
      this.searchVal = ''
    }
  },
  components: {topTitle}
}
</script>

<style lang="less" rel="stylesheet/less">
.searchContainer{
  background-color: #eee;
  width: 100%;
  min-height: 100%;
  .searchContentContainer{
    padding: 50px 0;
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
}
</style>
