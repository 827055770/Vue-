import Vue from 'vue'
import {RECEIVE_SHOPS,RECEIVE_USER_INFO,RESET_USER_INFO,RESET_USER_LOGOUT,INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT,CLEAR_CART} from './mutation-types'
export default{
  [RECEIVE_SHOPS](state,{shops}){
    //直接操作state
    state.shoplists=shops;
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo=userInfo
  },
  [RESET_USER_INFO](state,{userInfo}){
    state.userInfo=userInfo
  },
  [RESET_USER_LOGOUT](state){
    state.userInfo=''
  },
  //加操作
  [INCREMENT_FOOD_COUNT](state,{food}){
    //第一次单击加
    if(!food.count){
      //food.count=1;
      Vue.set(food,'count',1);
      //把增加完数量food添加到cartFoods里
      state.cartFoods.push(food);
    }else{
      food.count++;
    }
  },

  [DECREMENT_FOOD_COUNT](state,{food}){
    //减操作
    if(food.count){
      food.count--;
      if(food.count===0){
        //将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food),1);
      }
    }
  },

  [CLEAR_CART](state){
    //清除food里的count属性归为0
    state.cartFoods.forEach(food=>food.count=0);
    //清除购物车里所有的数据
    state.cartFoods=[];
  }

}