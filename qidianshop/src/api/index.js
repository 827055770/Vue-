import ajax from './ajax'
const BASE_URL='/api';
export const shoplists=()=>ajax(`${BASE_URL}/shoplists`);
//注册
export const registeruser=(name,pass)=>ajax(BASE_URL+'/registeruser',{name,pass});
//登录  
export const loginuser=(name,pass)=>ajax(BASE_URL+'/loginuser',{name,pass},'POST');
//根据cookie会话  获取用户信息
export const reqUserInfo=()=>ajax(`${BASE_URL}/userinfo`);

//异步退出
export const reqLoginout=()=>ajax(`${BASE_URL}/logout`);
//根据id获取商加参数
export const shoplistone=(id)=>ajax(BASE_URL+'/shoplistone',{id});

//根据id获取商家的饮食
export const vueshopgoods=(id)=>ajax(BASE_URL+'/vueshopgoods',{id});

//根据id获取商家的评价
export const vuecomments=(id)=>ajax(BASE_URL+'/vuecomments',{id});

//添加收货地址
export const addaddress=(name,phone,address,username)=>ajax(BASE_URL+'/addaddress',{name,phone,address,username},'POST');

//根据username获取用户的收货地址

export const useraddress=(username)=>ajax(BASE_URL+'/useraddress',{username});

//添加订单信息
export const orderss=(order_num,address_id,food_count,food_totalprice,user_name)=>ajax(BASE_URL+'/orderss',{order_num,address_id,food_count,food_totalprice,user_name},'POST');

//根据username查询订单信息
export const userorderss=(username)=>ajax(BASE_URL+'/userorderss',{username});

//根据address_id查询地址
export const addressid=(addressid)=>ajax(BASE_URL+'/addressid',{addressid});

//直接
export const searchn=(search)=>ajax(BASE_URL+'/searchn',{search});

//添加个人中心信息
export const adduserinfo=(username,headerpic,phone,email,hobby)=>ajax(BASE_URL+'/adduserinfo',{username,headerpic,phone,email,hobby},'POST');

//查看个人中心的信息
export const indexuserinfo=(username)=>ajax(BASE_URL+'/indexuserinfo',{username});

//修改个人中心的信息
export const edituserinfo=(username,headerpic,phone,email,hobby)=>ajax(BASE_URL+'/edituserinfo',{username,headerpic,phone,email,hobby},'POST');
