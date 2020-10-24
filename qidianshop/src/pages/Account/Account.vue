<template>
<div>

  <HeaderTop title="结算页面">
    <router-link class="header_search" slot="left"  to="">
         <i @click="$router.back()" class="glyphicon glyphicon-menu-left" style="font-size:30px;margin:-6px 4px 3px -19px;color:yellow"></i>
  </router-link>

  </HeaderTop>
  
  <div class="container">
	<button class="btn btn-success" data-toggle="modal" data-target="#myModal" style="width:100%">添加收货地址</button> 
  <form @submit.prevent="addaddress" method="post">
	 <div id="myModal" class="modal fade">
	  	<div class="modal-dialog"> 
	    <div class="modal-content"> 
			   <div class="modal-header"> 
			    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
			    <h3 id="myModalLabel">添加收货地址</h3> 
			   </div> 
			   <div class="modal-body"> 
			    	
			    		<div class="form-group">
			    			<label>姓名</label>
			    			<input type="text" name="name" class="form-control" placeholder="请输入姓名" v-model="name">	
			    		</div>

			    		<div class="form-group">
			    			<label>电话</label>
			    			<input type="text" name="phone" class="form-control" placeholder="请输入电话" v-model="phone"> 	
			    		</div>

			    		<div class="form-group">
			    			<label>配送地址</label>
			    			<input type="text" name="address" class="form-control" placeholder="请输入配送地址" v-model="address">	
			    		</div>
			   </div> 
			   <div class="modal-footer"> 
			    <button class="btn btn-danger" data-dismiss="modal">取消</button> 
			    <button class="btn btn-success">添加</button> 
			   </div>
		</div>
		</div>
	</div>
</form>

</div>
<div style="margin:15px 0px 0px 0px;">
<h1 style="font-size:23px;background-color:yellow">收货地址</h1>

<ul style="margin:15px 0px 0px 0px;" v-if="dizhi">
  <li v-for="(item,index) in useraddaddress" :key="index" style="width:100%;height:30px">
   <input type="radio" name="address_id" :value="item.id" v-model="address_id"> 姓名:{{item.name}} 电话:{{item.phone}} 地址:{{item.address}}
  </li>
</ul>

<div v-else>
  <p style="font-size:200%;color:red">请添加收货地址</p>
</div>


</div>
<div style="margin:15px 0px 0px 0px;">
<h1 style="font-size:23px;background-color:yellow">所购商品</h1>
  <div class="list-content">
    <ul>
    <li class="food" v-for="(item,index) in cartFoods" :key="index">
    <span class="name">{{item.foodname}}</span>
    <div class="price"><span>￥{{item.price}}</span></div>
    <div class="cartcontrol-wrapper">
    <CartControl :food="item"/>
    </div>
    </li>
    </ul>
  </div>


</div>
<div>
  <a href="javascript:void(0)">总计价格{{totalPrice}}元</a>
  <button type="button" class="btn btn-success" @click="order" style="float:right">{{orderText}}</button>
</div>

</div>

</template>
<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

import CartControl from '../../components/CartControl/CartControl'
import {mapState,mapGetters} from "vuex"
import {addaddress,useraddress,orderss} from '../../api'
import {Toast} from 'mint-ui'
export default {
  inject:['reload'],//注入
  data(){
    return {
      name:'',
      phone:'',
      address:'',
      useraddaddress:'',
      address_id:'',//选中地址的id
      dizhi:''
    }
  },
  
  components:{
    HeaderTop,
    CartControl
  },
  computed:{
    //获取登录的用户名
    ...mapState(['userInfo']),
    //获取vuex statecartFoods状态数据
    ...mapState(['cartFoods']),
    //获取vuex计算属性值
    ...mapGetters(['totalCount','totalPrice',]),
    orderText(){
      const {totalPrice}=this
      const address_id=this.address_id
      if(totalPrice===0){
        return '没有食品';
      }else if(!address_id){
        return "请选择配送地址";
      }else{
        return '结算';
      }
    }
  },
  methods:{
    async addaddress(){
      //console.log(this.name)
      //console.log(this.userInfo)
      const res=await addaddress(this.name,this.phone,this.address,this.userInfo);
      //console.log(res);
      if(res.msg==="ok"){
        //alert("成功");
        this.name='';
        this.phone='';
        this.address='';
        //局部刷新
        this.reload()
        $('#myModal').modal('hide') //隐藏模态框
        Toast("添加配送地址成功");
      }
    },
    async order(event){
      //console.log("哈哈哈");
      if(event.target.innerHTML=="结算"){
          //往订单里添加数据
          //第一个订单号
           const order_qq=Math.random()+'songqi';
           const order_num=order_qq.substring(2);
          //console.log(order_num);
          //地址id
          const address_id=this.address_id;
          //购买的总数量
          const food_count=this.totalCount;
          //console.log(food_count);      
          //购买的总价格
          const food_totalprice=this.totalPrice;
          //console.log(food_totalprice);
          //获取购买者的用户名
          const user_name=this.$route.params.username;
          //获取商品的id
          
          /*console.log(this.cartFoods);
          for(let i=0;i<this.cartFoods.length;i++){
              var good_id=this.cartFoods[i].id;
              
          }
          console.log(gogogo);*/
          //const good_id=
          //console.log(order_num,address_id,food_count,food_totalprice,user_name);
          const res=await orderss(order_num,address_id,food_count,food_totalprice,user_name);
          //console.log(res);
          if(res.msg==='ok'){
            Toast("请去订单页面付款");
            this.$router.push("/order");
          }else{
            Toast("有误请重新购买");
          }

          
      }else{
        const content=event.target.innerHTML;
        Toast(content);
      }
    }
  },
  async mounted(){
    //接收传过来的登录的用户名
    const username=this.$route.params.username;
    //console.log(this.userInfo);
      const res=await useraddress(username);
      //console.log(res);
      if(res.msg==='error'){
        this.dizhi=false;
      }else{
        this.dizhi=true;
      //console.log(res);
      //把查询出来的地址数据给address
      this.useraddaddress=res;
      //console.log(this.useraddaddress);
      }
  }

}
</script>
<style lang="stylus">
@import "../../common/stylus/mixins.styl"
  .shop-header
    height 100%
    position relative
    background #fff
    color #fff
    overflow hidden
    .shop-nav
      background-size cover
      background-repeat no-repeat
      height 40px
      padding 5px 10px
      position relative
      &::before
        content ""
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color rgba(119, 103, 137, .43)
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_left
          display: block
          padding: 5px
          font-size: 20px
          color: #fff
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
</style>