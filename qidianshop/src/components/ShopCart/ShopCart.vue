<template>
  <div>
<div class="shopcart">
<div class="content">
<div class="content-left" @click="toggle()">
<div class="logo-wrapper">
<div class="logo" :class="{highlight:totalCount}">
<i class="iconfont icon-shopping_cart" :class="{highlight:totalCount}"></i>
</div>
<div class="num" :class="{highlight:totalCount}" v-show="totalCount">{{totalCount}}</div>
</div>
<div class="price highlight">{{totalPrice}}元</div>
<div class="desc">另需配送费{{shoplist1.fee}} 元</div>
</div>
<div class="content-right">

<div class="pay" :class="payClass">
  <a href="javascript:void(0)" style="color:pink" @click="account">{{payText}}</a> 
</div>
</div>
</div>
<div class="shopcart-list" v-show="listShow">
<div class="list-header">
<h1 class="title">购物车</h1>
<span class="empty" @click="clearCart">清空</span>
</div>
<div class="list-content">
<ul>
<li class="food" v-for="(item,index) in cartFoods" :key="index">
<span class="name" style="position:relative;left:-40%">{{item.foodname}}</span>
<div class="price"><span>￥{{item.price}}</span></div>
<div class="cartcontrol-wrapper">
<CartControl :food="item"/>
</div>
</li>
</ul>
</div>
</div>
</div>
<div class="list-mask" v-show="listShow" @click="toggle"></div>
</div>
</template>
<script>
import {MessageBox,Toast} from 'mint-ui'
import CartControl from '../../components/CartControl/CartControl'
import {shoplistone} from '../../api'
import{mapState,mapGetters} from 'vuex'
export default {
  props:{
    shoplistid:String
  },
  data() {
    return {
      msg: "ShopCart",
      shoplist1:'',
      isShow:false,
    }
  },
  methods:{
    toggle(){
      if(this.totalCount>0){
      this.isShow=!this.isShow;
      }
    },
    //清空购物车操作
    //引入MessageBox
    clearCart(){
      MessageBox.confirm('确定清除购物车吗?').then(action=>{
        //console.log("sss");
        //给vuex分发动作  响应actions
        this.$store.dispatch('clearCart');
      },()=>{

      });
    },
    account(event){
      //console.log("sdf")
      //console.log(event.target.innerHTML);
      if(event.target.innerHTML==="结算"){
        //console.log("ok");
        //判断是否登录
        if(this.userInfo){
          //跳转到结算页面
        this.$router.push("/account/"+this.userInfo);
        }else{
          this.$router.replace('/login');
        }
        
      }else{
        const fee=event.target.innerHTML;
        Toast(`还差${fee}`);
      }
    }
  },
  //计算属性
  computed:{
    //获取vuex statecartFoods状态数据
    ...mapState(['cartFoods']),
    //获取vuex 计算属性值
    ...mapGetters(['totalCount','totalPrice']),
    ...mapState(['userInfo']),
    //动态实现结算
    payClass(){
      //总计价格
      const {totalPrice}=this
      //配送费
      const minPrice=this.shoplist1.fee
      return totalPrice>=minPrice?'enough':'not-enough'
    },
    //动态实现数据变化
    payText(){
      const {totalPrice}=this
      //配送费
      const minPrice=this.shoplist1.fee
      if(totalPrice===0){
        return minPrice+'元';
      }else if(totalPrice<minPrice){
        return `还差${minPrice-totalPrice}`;
      }else{
        return '结算';
      }
    },
    listShow(){
      //判断如果购买数量为0就不显示购物列表样式和背景阴影
      if(this.totalCount==0){
        this.isShow=false;
        return false;
      }else{
        return this.isShow;
      }
    }
  },
  async mounted(){
      const id=this.shoplistid;
      const res=await shoplistone(id);
      //console.log(res);
      this.shoplist1=res;
      //console.log(this.shoplist1);
  },components:{
    CartControl
  }

};
</script>
<style lang="stylus">
@import "../../common/stylus/mixins.styl"
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition transform .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>