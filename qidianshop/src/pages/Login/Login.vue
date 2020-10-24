<template>
  <div>
  <section class="loginContainer"> 
   <div class="loginInner"> 
    <div class="login_header"> 
     <h2 class="login_logo">起点外卖</h2> 
     <div class="login_header_title"> 
      <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">注册</a> 
      <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">登录</a> 
     </div> 
    </div> 
    <div class="login_content"> 
      <!-- 注册 -->
     <form @submit.prevent="register"> 
      <div :class="{on:loginWay}"> 
       <section class="login_message"> 
        <input type="text" maxlength="11" placeholder="用户名" name="model" v-model="name"/> 
       </section> 
       <section class="login_verification"> 
        <input type="password" maxlength="8" placeholder="密码" name="pass" v-model="pass"/> 
       </section> 
       <section class="login_hint">
        <a href="javascript:;">《用户注册服务协议》</a>
       </section> 
      <button class="login_submit">用户注册</button> 
      </div> 
     
     </form>
    <!-- 登录 -->
    <form @submit.prevent="login" method="post">
      <div :class="{on:!loginWay}"> 
       <section> 
        <section class="login_message"> 
         <input type="text" maxlength="11" name="name1" placeholder="用户名" v-model="name1" /> 
        </section> 
        <section class="login_verification"> 
         <input type="text" name="pass1" v-model="pass1" maxlength="8" placeholder="密码" v-if="showPwd" /> 
         <input type="password" name="pass1" v-model="pass1" maxlength="8" placeholder="密码" v-else /> 

         <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd=!showPwd"> 
          <div class="switch_circle" :class="{right:showPwd}"></div> 
          <span class="switch_text"></span>
         </div> 
        </section>  
       </section> 
       <button class="login_submit">用户登录</button> 
      </div> 
      
     </form> 
     <a href="javascript:;" class="about_us">关于我们</a> 
    </div> 
    <a href="javascript:" class="go_back" @click="$router.back()"> <i class="iconfont icon-jiantou2"></i> </a> 
   </div> 
   <!-- 使用标签 -->
   <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
  </div>
</template>

<script>
//引入
import {registeruser,loginuser} from '../../api/index'
//引入组件
import AlertTip from '../../components/AlertTip/AlertTip.vue'

export default {
  data () {
    return {
      loginWay:false,  //true代表注册  false代表登录
      name:'',
      pass:'',
      registername:'',
      registerpass:'',
      name1:'',
      pass1:'',
      loginname:'',
      loginpass:'',
      alertText:'',//提示框的信息
      alertShow:false,//隐藏提示框
      showPwd:false
    }
  },
  methods:{
    async register(){
      //console.log('注册');
      this.registername=this.name;
      //校验注册用户名 必须是6到8的字母数字下换线
      //整则 /^\w{6,8}$/
      if(!/^\w{6,8}$/.test(this.registername)){
        //显示提示框
        this.alertShow=true;
        this.alertText="用户名必须是6-8位的数字字母下划线";
        console.log("用户名必须是6-8位的数字字母下划线");
        return;
      }
      this.registerpass=this.pass;
      //校验密码
      if(!/^\w{8,18}$/.test(this.registerpass)){
        this.alertShow=true;
        this.alertText="密码必须是8-18位的任意字母数字下划线";
        console.log("密码必须是8-18位的任意字母数字下划线");
        return;
      }
      //console.log(this.registername,this.registerpass);
      const res=await registeruser(this.registername,this.registerpass);
      //console.log(res);
      if(res.msg=='ok'){
        const user=this.registername;
        this.$store.dispatch('recordUser',user);
        //跳转到个人中心
        this.$router.replace('/profile');
      }
    },

    async login(){
      //console.log("用户");
      //console.log(this.name1,this.pass1);
      this.loginname=this.name1;
      this.loginpass=this.pass1;
      //console.log(this.loginname,this.loginpass);
      const res=await loginuser(this.loginname,this.loginpass);
      //console.log(res);
      if(res.msg=="ok")
      { const user=this.loginname;
        this.$store.dispatch('recordUser',user)
        this.$router.replace("/profile");
        
      }else if(res.msg=="nameerror")
      {
        this.alertShow=true;
        this.alertText="用户名错误";
        console.log("用户名错误");
        return;

      }else{
        this.alertShow=true;
        this.alertText="密码错误";
        console.log("密码错误");
        return;
      }
    },
    closeTip(){
      this.alertShow=false;//隐藏提示框
      this.alertText="";//使提示框信息为空
    }
  },
  components:{
    AlertTip
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
 .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
