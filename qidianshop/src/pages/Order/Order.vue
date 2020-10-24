<template>
  <div>
    <div>
      <section class="order">
        <HeaderTop title="我的订单"></HeaderTop>
        <div v-if="anan">
        <section class="order_no_login" v-if="orderLogin">
          <img src="./images/person.png" />
          <h3>登录后查看外卖订单</h3>
          <button @click="login">立即登陆</button>
        </section>
        
        <div style="border:1px solid #DEB887;" v-for="(item,index) in userorder" :key="index" v-else>
          <div class="page-header">
            <p class="text-left">订单号</p><em class="text-right" style="position:relative;top:-14px">{{item.order_num}}</em>
            <p class="text-left">地址</p>
            <em style="position:relative;top:-14px">{{item.address_id.address}}</em>
            <p class="text-left">手机号</p>
            <span style="position:relative;top:-14px">{{item.address_id.phone}}</span>
            <p class="text-left">数量</p>
            <span style="position:relative;top:-14px">{{item.food_count}}</span>
            <p class="text-left">金钱</p>
            <span style="position:relative;top:-14px">{{item.food_totalprice}}</span>
            <p class="text-left">下单人</p>
            <span style="position:relative;top:-23px;left:10%">{{item.user_name}}</span>

            <button class="btn btn-success" style="position:relative;left:32%;top:13px">去支付</button>
          </div>
        </div>
        <div style="width:20%;height:100px">

        </div>
        </div>

        <div style="font-size:150%" v-else>
          暂时没有订单哟!请去购买吧
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { mapState } from "vuex";
import { userorderss, addressid } from "../../api/index";
export default {
  components: { HeaderTop },
  data() {
    return {
      msg: "Order",
      userorder: "",
      useraddres: "",
      anan:''
    };
  },
  computed: {
    ...mapState(["userInfo"]),

    orderLogin() {
      if (this.userInfo) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
  //钩子函数
  async mounted() {
    //获取username
    const username = this.userInfo;
    //console.log(username);
    //这个是查询订单表
    const res = await userorderss(username);
    if(res.msg==='error'){
      this.anan=false;
    }else{
      this.anan=true;
    
    //console.log(res);
    this.userorder = res;
    //console.log(this.userorder);
    for (let i = 0; i < this.userorder.length; i++) {
      const reg = await addressid(this.userorder[i].address_id);
      this.userorder[i].address_id = reg[0];
    }
    //console.log(this.userorder);
    }
  },
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixins.styl';

.order { // 订单
  width: 100%;

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}
</style>