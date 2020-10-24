//包含多个基于state模块的getter计算数据对象 例如总计价格 数量
export default{
  //计算属性=>totalCount=>购物车总计数量
  totalCount(state){
    //reduce方法接收一个函数作为累加器 preTotal当前数量 food购买的食品
    //0代表没有总计数量的话  总计数量为0
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
  },
  //计算属性=>totalPrice=>购物车总计价格
  totalPrice(state){
    //0代表没有总计价格的话  总计价格为0
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count*food.price,0);
  },


}

