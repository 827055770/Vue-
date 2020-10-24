import Vue from 'vue'
import VueRouter from 'vue-router'

/*import Msite from '../pages/Msite/Msite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'*/
const Msite=()=>import('../pages/Msite/Msite.vue')
const Search=()=>import('../pages/Search/Search')
const Order=()=>import('../pages/Order/Order.vue')
const Profile=()=>import('../pages/Profile/Profile.vue')



import UserInfo from '../pages/Profile/UserInfo.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import Account from '../pages/Account/Account.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      //默认转跳到外卖首页
      path:'/',
      redirect:'msite',
    },
    //外卖路由
    {
      path:'/msite',
      component:Msite,
      //$route路由对象里有meta属性 它可以控制组件和隐藏
      meta:{
        showFooter:true //显示尾部
      }
    },
    //搜索路由
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    //订单路由
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    //个人中心路由
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    //登录路由
    {
      path:'/login',
      component:Login,
      meta:{
        showFooter:false
    }
  },
  //个人信息路由
  {
    path:'/userinfo',
    component:UserInfo,
  },
  //食品信息页面
  {
    path:'/shop',
    component:Shop,
    children:[
      //点餐
        {
          path:'/shop/goods/:id',
          component:ShopGoods,
          
        },
        //评价
        {
          path:'/shop/ratings/:id',
          component:ShopRatings
        },
        //默认进入点餐路由
        {
          path:'',
          redirect:'/shop/goods'
        }
      ]
  },
  {
    path:'/account/:username',
    component:Account,
  },
]
})