<template>
  <div>
    <HeaderTop title="个人详情页面">
      <router-link class="header_search" slot="left" to>
        <i
          @click="$router.back()"
          class="glyphicon glyphicon-menu-left"
          style="font-size:30px;margin:-6px 4px 3px -19px;color:yellow"
        ></i>
      </router-link>
    </HeaderTop>
    <!--这个是添加的true的-->
    
    <form @submit.prevent="adduserinfo" v-if="ladao" method="post" enctype="multipart/form-data">
    <div class="container-fluid" v-for="(item,index) in usersinfo2" :key="index">
      
      <div class="row">
        <div class="col-md-5" style="background:#E6E6E6">
          <h1 style="font-size: 200%;">头像:</h1>
        </div>
        <div class="col-md-5" style>
          <img
            class="img-circle"
            style="width:40%;background:#E6E6E6"
            src="http://localhost:8090/upload_dfa46b6dc9d16de3b0185ec3f56e8a48.jpg"
            alt
          />
          <!--<input type="file" name="headerpic" />-->
        </div>
      </div>

      <div class="row">
        <div class="col-md-5" style="background:#E6E6E6">
          <h2 style="font-size: 200%;">手机:</h2>
        </div>
        <div class="col-md-5" style="background:#E6E6E6">
          <input type="text" value="songqi" name="phone" v-model="phone" style="width: 100%;height: 40px;" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-5" style="background:#E6E6E6">
          <h2 style="font-size: 200%;" >邮箱:</h2>
        </div>
        <div class="col-md-5" style="background:#E6E6E6;">
          <input type="text" name="email" v-model="email" style="width: 100%;height: 40px;"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4" style="background:#E6E6E6">
          <h2 style="font-size: 200%;">爱好:</h2>
        </div>
        <div class="col-md-5" style="background:#E6E6E6">
          <input type="text" name="hobby" v-model="hobby" style="width: 100%;height: 40px;"/>
        </div>
      </div>
      <input type="submit" class="btn btn-success" value="提交">
    
    </div>
    </form>


    
    <!--这个是添加的true的-->


    <!--这个是修改的false的-->
    <form @submit.prevent="edituserinfo" v-else method="post" enctype="multipart/form-data">
    <div class="container-fluid" v-for="(item,index) in usersinfo2" :key="index">
      
      <div class="row">
        <div class="col-md-5" style="background:#E6E6E6">
          <h1 style="font-size: 200%;">头像:</h1>
        </div>
        <div class="col-md-5" style>
          <img
            class="img-circle"
            style="width:40%;background:#E6E6E6"
            :src="item.headerpic"
            alt
          />
          <!--<input type="file" name="headerpic" />-->
        </div>
      </div>

      <div class="row">
        <div class="col-md-5" style="background:#E6E6E6">
          <h2 style="font-size: 200%;">手机:</h2>
        </div>
        <div class="col-md-5" style="background:#E6E6E6">
          <input type="text" value="songqi" name="phone" v-model="phone" style="width: 100%;height: 40px;" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-5" style="background:#E6E6E6">
          <h2 style="font-size: 200%;" >邮箱:</h2>
        </div>
        <div class="col-md-5" style="background:#E6E6E6;">
          <input type="text" name="email" v-model="email" style="width: 100%;height: 40px;"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4" style="background:#E6E6E6">
          <h2 style="font-size: 200%;">爱好:</h2>
        </div>
        <div class="col-md-5" style="background:#E6E6E6">
          <input type="text" name="hobby" v-model="hobby" style="width: 100%;height: 40px;"/>
        </div>
      </div>
      <input type="submit" class="btn btn-warning" value="修改">
    
    </div>
    </form>
    <!--这个是修改的false的-->
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import {adduserinfo,indexuserinfo,edituserinfo} from "../../api/index"
import {mapState} from 'vuex'
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      msg: "userinfo",
      phone:'',
      email:'',
      hobby:'',
      usersinfo2:'',
      ladao:''
    };
  },
  computed:{
    //获取登录的用户名
    ...mapState(['userInfo'])
  },
  components: {
    HeaderTop,
  },
  async mounted(){
        this.username=this.userInfo;
        //console.log(this.username);
        const res= await indexuserinfo(this.username);
        this.usersinfo2=res;
        if(this.usersinfo2.msg==='error'){
          this.ladao=true
          
          //console.log("哈哈哈");
        }else{
          this.ladao=false

          //console.log(this.usersinfo2);

          console.log(this.usersinfo2[0].phone);
          this.phone=this.usersinfo2[0].phone;
          this.email=this.usersinfo2[0].email;
          this.hobby=this.usersinfo2[0].hobby;
          //console.log("啦啦啦");
        }


  },
  methods:{
    //表单阻止点击事件
    async adduserinfo(){
      this.username=this.userInfo;  //获取用户名
　　　/*this.formdata=new FormData();//new一个formData事件
      this.formdata.append("headerpic",this.headerpic);
      this.formdata.append("username",this.username);
      this.formdata.append("this.phone",this.phone);
      console.log(this.formdata.getAll(headerpic));*/
      //console.log(this.formdata); 
      //console.log(this.username);
      this.headerpic='http://localhost:8090/upload_dfa46b6dc9d16de3b0185ec3f56e8a48.jpg';
      //console.log(this.username,this.headerpic,this.phone,this.email,this.hobby);
      const res=await adduserinfo(this.username,this.headerpic,this.phone,this.email,this.hobby);
      //console.log(res.msg)
      if(res.msg=='ok'){
        Toast("添加成功");
        this.$router.push("/profile");
      }else{
        Toast("添加失败 请从新添加");
      }
    },
    async edituserinfo(){
      this.username=this.userInfo;  //获取用户名
      this.headerpic='http://localhost:8090/upload_dfa46b6dc9d16de3b0185ec3f56e8a48.jpg';
      console.log(this.username,this.headerpic,this.phone,this.email,this.hobby);
      const red=await edituserinfo(this.username,this.headerpic,this.phone,this.email,this.hobby);
        Toast("修改成功");
    }
    
    /*changeFile(e){
      //console.log(e.target.files);
      /*let inputDOM = this.$refs.inputer;
　　　　this.file = inputDOM.files[0];// 通过DOM取文件数据
        console.log(this.file);*/
        //console.log(e.target.files[0]);
       //this.headerpic=e.target.files[0];
　　　　//this.formData=new FormData();//new一个formData事件

　　　　//this.formData.append("file",this.file); //将file属性添加到formData里
　　　　//此时formData就是我们要向后台传的参数了
        //console.log(this.file);
        
    //}
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">

</style>