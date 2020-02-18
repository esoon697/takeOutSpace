<template>
  <div class="starContainer ellipsis" :class="starSize">
    <span class="starItem" v-for="(star,index) in stars" :key="index" :class="star"></span>
  </div>
</template>

<script>
export default {
  props: ['rating', 'size'],
  data () {
    return {
    }
  },
  computed: {
    stars () {
      let starsArr = []
      let rating = this.rating
      let remainder = rating - parseInt(rating)
      for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
          starsArr.push('on')
        } else if (remainder && i === parseInt(rating)) {
          if (remainder * 10 >= 5) {
            starsArr.push('half')
          } else {
            starsArr.push('off')
          }
        } else {
          starsArr.push('off')
        }
      }
      return starsArr
      // let rating = this.rating
      // let starsArr = []
      // let intRating = Math.floor(rating)
      // for (let i = 0; i < intRating; i++) {
      //   starsArr.push('on')
      // }
      // if (rating * 10 - intRating * 10 >= 5) {
      //   starsArr.push('half')
      // }
      // while (starsArr.length < 5) {
      //   starsArr.push('off')
      // }
      // return starsArr
    },
    starSize () {
      return 'star-' + this.size
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less'>
@import "../../common/less/mixins.less";
.star-48{
  .on{
    .bg-image('./imgs/star48_on');
  }
  .half{
    .bg-image('./imgs/star48_half');
  }
  .off{
    .bg-image('./imgs/star48_off');
  }
  .starItem{
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
    margin-right: 22px;
    &:last-child{
      margin-right: 0;
    }
  }
}
.star-36{
  .on{
    .bg-image('./imgs/star36_on');
  }
  .half{
    .bg-image('./imgs/star36_half');
  }
  .off{
    .bg-image('./imgs/star36_off');
  }
  .starItem{
    height: 15px;
    width: 15px;
    background-size: 15px 15px;
    margin-right: 6px;
    &:last-child{
      margin-right: 0;
    }
  }
}
.star-24{
  .on{
    .bg-image('./imgs/star24_on');
  }
  .half{
    .bg-image('./imgs/star24_half');
  }
  .off{
    .bg-image('./imgs/star24_off');
  }
  .starItem{
    height: 10px;
    width: 10px;
    background-size: 10px 10px;
    margin-right: 3px;
    &:last-child{
      margin-right: 0;
    }
  }
}
.starContainer{
  float: left;
  font-size: 0;
  .starItem{
    display: inline-block;
    background-repeat: no-repeat;
  }
}
</style>
