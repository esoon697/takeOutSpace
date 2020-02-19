<template>
  <div class="profileContainer">
    <topTitle title='个人中心'/>
    <div class="profileContentContainner">
      <div class="profileInfoWrapper">
        <div class="InfoTop" @click="gotoLogin">
          <div class="topLeft">
            <p class="head-portrait" v-if="portrait"><img src="" alt=""></p>
            <p class="default-portrait" v-else>
              <span class="iconfont icon-yonghudianji"></span>
            </p>
          </div>
          <div class="topCenter">
            <p v-if="Object.keys(this.userinfo).length">{{userinfo.name || userinfo.phone}}</p>
            <p v-else>登录/注册</p>
            <p>
              <span class="phone-icon iconfont icon-webicon205"></span>
              <span>{{Object.keys(this.userinfo).length && userinfo.phone? '已绑定':'暂无绑定的手机号'}}</span>
            </p>
          </div>
          <div class="topRight">
              <span class="iconfont icon-youjiantou_huaban"></span>
            </div>
        </div>
        <div class="InfoBottom">
          <div class="bottomLeft">
            <p class="balance"><span class="ellipsis">1.00</span>元</p>
            <span>我的余额</span>
          </div>
          <div class="bottomCenter">
            <p class="on-sale"><span class="ellipsis">5</span>个</p>
            <span>我的优惠</span>
          </div>
          <div class="bottomRight ">
            <p class="integral"><span class="ellipsis">100</span>分</p>
            <span>我的积分</span>
          </div>
        </div>
      </div>
      <div class="profileList">
        <div class="listItem">
          <span class="iconfont icon-dingdan_huaban"></span>
          <span class="myOrder">我的订单</span>
          <span class="iconfont icon-youjiantou_huaban"></span>
        </div>
        <div class="listItem">
          <span class="iconfont icon-jifenshangcheng"></span>
          <span class="integralShop">积分商城</span>
          <span class="iconfont icon-youjiantou_huaban"></span>
        </div>
        <div class="listItem">
          <span class="iconfont icon-huiyuan"></span>
          <span class="member">外卖会员</span>
          <span class="iconfont icon-youjiantou_huaban"></span>
        </div>
        <div class="listItem">
          <span class="iconfont icon-zhongxinguanli"></span>
          <span class="serviceCenter">服务中心</span>
          <span class="iconfont icon-youjiantou_huaban"></span>
        </div>
        <div v-show="Object.keys(this.userinfo).length" class="listItem loginOut" @click="loginOut">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import topTitle from '../../components/top_title/top_title'
import { MessageBox, Toast } from 'mint-ui'
// import { mapState } from 'vuex'
import localStore from '../../localStorage'
export default {
  data () {
    return {
      portrait: '',
      userinfo: this.$store.state.userinfo
    }
  },
  computed: {
    // ...mapState([])
  },
  mounted () {
    this.userinfo = localStore.get('userinfo')
  },
  methods: {
    gotoLogin () {
      console.log('去登录了')
      if (!Object.keys(this.userinfo).length) {
        this.$router.push('login')
      }
    },
    loginOut () {
      MessageBox.confirm('确定执行此操作?').then(action => {
        localStorage.removeItem('userinfo')
        this.userinfo = ''
        Toast('退出登录')
      },
      action => {
        console.log('取消操作')
      })
    }
  },
  components: {topTitle}
}
</script>

<style lang="less" rel="stylesheet/less">
@themeColor: #02a774;
.profileContainer{
  width: 100%;
  height: 100%;
  background-color: #eee;
  .profileContentContainner{
    padding: 50px 0;
    .profileInfoWrapper{
      .InfoTop{
        height: 70px;
        display: flex;
        background-color: @themeColor;
        margin-top: 1px;
        padding: 15px 5px;
        .topLeft{
          flex: 1;
          .head-portrait{
            border-radius: 50%;
            overflow: hidden;
            img{
              width: 70px;
              height: 70px;
            }
          }
          .default-portrait{
            overflow: hidden;
            border-radius: 50%;
            .iconfont{
              background-color: #999;
              font-size: 70px;
              color: #eee;
            }
          }
        }
        .topCenter{
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 8;
          margin-left: 10px;
          p{
            color: white;
            &:first-child{
              font-size: 18px;
              font-weight: bold;
              // padding-left: 7px;
            }
            &:last-child{
              font-size: 16px;
              span{
                vertical-align: middle;
                margin-left: -6px;
              }
            }
          }
        }
        .topRight{
          height: 70px;
          line-height: 70px;
          text-align: center;
          flex: 1;
          margin-right: 10px;
          .iconfont{
            color: white;
          }
        }
      }
      .InfoBottom{
        display: flex;
        // margin-top: 10px;
        background-color: #fff;
        // .bottomCenter{
        //   border-style: none solid;
        //   border-width: 1px;
        //   border-color: #eee;
        // }
        .bottomLeft, .bottomCenter, .bottomRight{
          flex: 1;
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          color: #888;
          padding-top: 10px;
          border-left: 1px solid #eee;
          p{
            span{
              width: 90px;
              font-size: 26px;
              font-weight: bold;
              vertical-align: text-bottom;
            }
          }
          .balance{
            span{
              color: rgb(245, 170, 0)
            }
          }
          .on-sale{
            span{
              color: rgb(250, 80, 70);
            }
          }
          .integral{
            span{
              color: rgb(50, 200, 40)
            }
          }
          span{
            font-size: 16px;
          }
        }
      }
    }
    .profileList{
      margin-top: 12px;
      .listItem{
        height: 45px;
        font-size: 18px;
        color: #555;
        margin-bottom: 1px;
        background-color: #fff;
        line-height: 45px;
        padding: 0 5px;
        &:nth-child(3n){
          margin-bottom: 10px;
        }
        &:last-child{
          margin-bottom: 0;
        }
        span{
          vertical-align: middle;
        }
        .icon-dingdan_huaban{
          color: rgb(50, 200, 40);
        }
        .icon-jifenshangcheng{
          color: rgb(250, 80, 70);
        }
        .icon-huiyuan{
          color: rgb(245, 170, 0);
        }
        .icon-zhongxinguanli{
          color: #02a774;
        }
        .icon-youjiantou_huaban{
          float: right;
          color: #ccc;
          font-size: 16px;
        }
      }
      .loginOut{
        color: #fff;
        background-color: rgb(255, 60, 60);
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>
