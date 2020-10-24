//通过给mutation模块发请求间接更新state的数据的多个方法的对象
import {RECEIVE_SHOPS,RECEIVE_USER_INFO,RESET_USER_INFO,RESET_USER_LOGOUT,INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT,CLEAR_CART} from './mutation-types'
import {shoplists,reqUserInfo, reqLoginout} from '../api'

export default{
  //异步获取商家列表
  async getShops({commit,state}){
    //发送ajax请求异步
    const result=await shoplists();
    const shops=result;
    //提交一个mutation请求
    commit(RECEIVE_SHOPS,{shops});
  },
  //同步记录的信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  //异步根据会话cookie获取登录或者注册的信息
  async getUserInfo({commit}){
     const result=await reqUserInfo();
     const userInfo=result.msg;
     //给mutations发请求 传递参数 userInfo
     commit(RESET_USER_INFO,{userInfo});
  },
  //异步退出
  async logout({commit}){
    //调用异步函数
    const result=await reqLoginout();
    //判断
    if(result.msg===0){
      commit(RESET_USER_LOGOUT);
    }
  },
  //购物车加减操作
  //isAdd加减参数  food商品数据
  updateFoodCount({commit},{isAdd,food},){
    //给两个分支判断是加还是减,同时发两个请求
    if(isAdd){
      //加操作
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      //键操作
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  //同步清除购物车
  clearCart({commit}){
    commit(CLEAR_CART);
  }

}
