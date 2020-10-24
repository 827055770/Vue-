let express=require("express");

//引入mysql
let mysql=require("mysql");
//引入fromidable
let formidable=require("formidable");
//引入url'
let urlTool=require("url");
const { connect } = require("http2");
//引入cookie
let cookieParser=require("cookie-parser");
const { stringify } = require("querystring");
//使用框架
let app=express();
//使用cookie
app.use(cookieParser());
app.use(express.static('node_modules'));
//设置模板引擎类型
app.set('view engine','ejs');
//设置存储模板目录
app.set('views','./views');
app.use(express.static("uploads"));
//配置数据库的信息
let connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'qidianwebshop'
});
//连接数据库
connection.connect();

app.get("/index",(req,res)=>{
  res.write("哈哈哈");
  res.end();
});6

//数据库列表模块
app.get("/shoplist",(req,res)=>{
  //执行mysql语句
  connection.query('select * from shoplists',(error,results,fields)=>{
    if(error) throw error;
    //console.log(results);
    res.render("shoplist",{data:results});
    res.end();
  })
});

//商品的添加
app.get("/shopadd",(req,res)=>{
  res.render("shopadd");
  res.end();

});
//表单的执行添加
app.post("/shopcreate",(req,res)=>{
  //res.write("this is ");
  let from=new formidable.IncomingForm();
  from.uploadDir="./uploads";
  from.keepExtensions=true;
  from.parse(req,(err,fields,files)=>{
    //console.log(fields);
    //console.log(files);
    let name=fields.name;
    let content=fields.content;
    let fee=fields.fee;
    let pic="http://localhost:8090/"+files.pic.path.slice(8);
    console.log(name,content,fee,pic);
    connection.query(`insert into shoplists(name,pic,content,fee) value('${name}','${pic}','${content}','${fee}')`,(error,results,fields)=>{
      res.redirect("/shoplist");
    
      res.end();
    });
  });
});
//删除商家
app.get("/shoplistdel",(req,res)=>{
  //res.write("this is del")\
  let url=req.url;
  let param=urlTool.parse(url,true);
  let id=param.query.id;
  //console.log(id);
  //删除数据库的数据
  connection.query(`delete from shoplists where id=${id}`,(error,results,fields)=>{
    //console.log(results);
    if(results.affectedRows>0){
      res.redirect("/shoplist");
      res.end();
    }else{
      res.redirect("/shoplist");
      res.end();
    }
    
  });
});
//修改商家
app.get("/shoplistedit",(req,res)=>{
  let url=req.url;
  let param=urlTool.parse(url,true);
  //获取id
  let id=param.query.id;
  connection.query(`select * from shoplists where id=${id}`,(error,results,fields)=>{
    //console.log(results[0]);
    res.render("shopedit",{data:results[0]})
    res.end();
  });
});
app.post("/doshoplistedit",(req,res)=>{
  //console.log("小子");
  let form=new formidable.IncomingForm();
  form.uploadDir="./uploads";
  form.keepExtensions=true;
  form.parse(req,(err,fields,files)=>{
    let name=fields.name;
    let pics=files.pic.path;
    let pic="http://localhost:8090/"+pics.slice(8);
    let content=fields.content;
    let fee=fields.fee;
    let id=fields.id;
    //console.log(name,pic,content,fee,id);
    //准备下sql
    let sql="update shoplists set name='"+name+"',content='"+content+"',fee='"+fee+"',pic='"+pic+"' where id='"+id+"'";
    //console.log(sql);

    connection.query(sql,(error,results,fields)=>{
      console.log(results);
        res.redirect("/shoplist");
        res.end();
     });
    
  });
});

//开放给vue项目商家列表数据json格式
app.get("/shoplists",(req,res)=>{
  connection.query('select * from shoplists',function(error,results,fields){
    if (error) throw error;
    res.setHeader('content-type','text/html;charset=utf-8');
    res.write(JSON.stringify(results));
    res.end();
  });
});
//根据单个商家数据
app.get('/shoplistone',function(req,res){
  //获取id
  let url=req.url;
  let param=urlTool.parse(url,true);
  let id=param.query.id;
  //根据id获取当前商家数据
  connection.query('select * from shoplists where id='+id,function(error,results,fields){
    if (error) throw error;
    res.setHeader('content-type','text/html;charset=utf-8');
    res.write(JSON.stringify(results[0]));
    res.end();
  });
});

//食品的列表
app.get("/shopgood",function(req,res){
  //获取url
  let url=req.url;
  //解析url
  let param=urlTool.parse(url,true);
  //获取name
  let id=param.query.id;
  //console.log(id);
  //数据库列表模块
  //执行mysql语句
  connection.query('select * from shopgoods where shoplist_id='+id,(error,results,fields)=>{
    if(error) throw error;
    //console.log(results);
    res.render("shopgood/shopgood",{data:results,shoplist_id:id});
    res.end();
});
});

//食品的添加
app.get("/shopgoodadd",function(req,res){
  //获取url
  let url=req.url;
  //解析url
  let param=urlTool.parse(url,true);
  //获取name
  let shoplist_id=param.query.shoplist_id;
  res.render("shopgood/shopgoodadd",{shoplist_id:shoplist_id});
  res.end();
});

//食品的执行添加
app.post("/shopgoodcreate",function(req,res){
  let from=new formidable.IncomingForm();
  from.uploadDir="./uploads";
  from.keepExtensions=true;
  from.parse(req,(err,fields,files)=>{
    //console.log(fields);
    //console.log(files);
    let foodname=fields.foodname;
    let descr=fields.descr;
    let price=fields.price;
    let foodpic="http://localhost:8090/"+files.foodpic.path.slice(8);
    let shoplist_id=fields.shoplist_id;
    //console.log(foodpic,shoplist_id);
    connection.query(`insert into shopgoods(foodname,descr,price,foodpic,shoplist_id) value('${foodname}','${descr}','${price}','${foodpic}',${shoplist_id})`,(error,results,fields)=>{
      res.redirect("/shopgood?id="+shoplist_id);
      res.end();
    });
  });
});

//商家食品列表
app.get("/vueshopgoods",function(req,res){
  let url=req.url;
  let param=urlTool.parse(url,true);
  let id=param.query.id;
  connection.query("select * from shopgoods where shoplist_id="+id,function(error,results,fields){
    res.setHeader('content-type','text/html;charset=utf-8');
    res.write(JSON.stringify(results));
    res.end();
  });
});

//评论列表
app.get("/vuecomments",function(req,res){
  let url=req.url;
  let param=urlTool.parse(url,true);
  let id=param.query.id;
  connection.query("select * from comments where shoplist_id="+id,function(error,results,fields){
    res.setHeader('content-type','text/html;charset=utf-8');
    res.write(JSON.stringify(results));
    res.end();
  });
});





//用户的注册
app.get('/registeruser',function(req,res){
  //获取url
  let url=req.url;
  //解析url
  let param=urlTool.parse(url,true);
  //获取name
  let name=param.query.name;
  //获取pass
  let pass=param.query.pass;
  //console.log(name,pass);
  //数据的入库
  //准备下sql语句
  let sql=`insert into users(name,pass)values('${name}','${pass}')`;
  //console.log(sql);
  connection.query(sql,(error,results,fields)=>{
   if(results.affectedRows>0){
     res.cookie('name',name,{maxAge:1000*60*60*24,httpOnly:true});
     res.write(JSON.stringify({'msg':'ok'}));
     res.end();
   }else{
    res.write(JSON.stringify({'msg':'error'}));
    res.end();
   }
  });
  
});

//用户登录 post模式
app.post('/loginuser',function(req,res){
  //收集表单数据
  let form=new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    let name=fields.name;
    let pass=fields.pass;
    //console.log(name,pass);
    //查询名字是否存在
    let sql=`select * from users where name='${name}'`;
    console.log(sql);
    connection.query(sql,(error,results,fields)=>{
      if(error) throw error;
      if(results.length<=0){
        res.write(JSON.stringify({'msg':'nameerror'}));
        res.end();
      }else{
        if(pass==results[0].pass){
          //存储cookie
          res.cookie('name',name,{maxAge:1000*60*60*24,httpOnly:true});       
          res.write(JSON.stringify({'msg':'ok'}));
          res.end();
        }else{
          res.write(JSON.stringify({'msg':'mimaerror'}));
          res.end();
        }
        
      }
    })
  });
});








//根据cookie会话获取用户信息
app.get("/userinfo",function(req,res){
  if(!req.cookies.name){
    res.write(JSON.stringify({'msg1':'no login'}));
    res.end();
  }else{
    res.write(JSON.stringify({'msg':req.cookies.name}));
    res.end();
  }
});
//退出 清除cookie
app.get("/logout",function(req,res){
  res.clearCookie("name");
  res.write(JSON.stringify({'msg':0}));
  res.end();
});


//给登录的用户添加收货地址
app.post("/addaddress",function(req,res){
  let form=new formidable.IncomingForm();
  form.parse(req,(err,fields,files)=>{
    //console.log(fields);
    //console.log(files);
    let name=fields.name;
    let phone=fields.phone;
    let address=fields.address;
    let username=fields.username;
    //console.log(name,content,fee,pic);
    connection.query(`insert into address(name,phone,address,username) value('${name}','${phone}','${address}','${username}')`,(error,results,fields)=>{
      if(error) throw error;
      if(results.affectedRows>0){
        res.write(JSON.stringify({"msg":"ok"}));
        res.end();
      }else{
        res.write(JSON.stringify({"msg":"error"}));
        res.end();
      }
      
    });
  });
});

//查询登录的用户地址
app.get("/useraddress",function(req,res){
  //获取url
  let url=req.url;
  //解析url
  let param=urlTool.parse(url,true);
  //获取name
  let username=param.query.username;
  //console.log(name,pass);
  //准备下sql
  //查询username的用户地址
  let sql=`select * from address where username='${username}'`;
  //console.log(sql);
  connection.query(sql,(error,results,fields)=>{
    //console.log(results);
    if(results==''){
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify({'msg':'error'}));
      res.end();
    }else{
      //console.log("no");
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify(results));
      res.end();
    }
  });
});

//给登录的用户往数据表订单中添加
app.post("/orderss",function(req,res){
  let form=new formidable.IncomingForm();
  form.parse(req,(err,fields,files)=>{
    //console.log(fields);
    //console.log(files);
    let order_num=fields.order_num;  //订单号
    let address_id=fields.address_id; //订单的地址id
    let food_count=fields.food_count;   //订单的数量
    let food_totalprice=fields.food_totalprice;  //订单的总额
    let user_name=fields.user_name;  //订单的总额
    //console.log(order_num,address_id,food_count,food_totalprice,user_name);
    
    connection.query(`insert into orders(order_num,address_id,food_count,food_totalprice,user_name) value('${order_num}','${address_id}','${food_count}','${food_totalprice}','${user_name}')`,(error,results,fields)=>{
      if(error) throw error;
      if(results.affectedRows>0){
        res.write(JSON.stringify({"msg":"ok"}));
        res.end();
      }else{
        res.write(JSON.stringify({"msg":"error"}));
        res.end();
      }
      
    });

  });
});

//通过username查询order
app.get("/userorderss",function(req,res){
  //获取url
  let url=req.url;
  //解析url
  let param=urlTool.parse(url,true);
  //获取name
  let username=param.query.username;
  //console.log(name,pass);
  //准备下sql
  //查询username的用户地址
  let sql=`select * from orders where user_name='${username}'`;
  //console.log(sql);
  connection.query(sql,(error,results,fields)=>{
    if(results==''){
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify({'msg':'error'}));
      res.end();
    }else{
      //console.log("no");
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify(results));
      res.end();
    }
  });
});

//通过username查询order
app.get("/addressid",function(req,res){
  //获取url
  let url=req.url;
  //解析url
  let param=urlTool.parse(url,true);
  //获取name
  let addressid=param.query.addressid;
  //console.log(name,pass);
  //准备下sql
  //查询username的用户地址
  let sql=`select * from address where id='${addressid}'`;
  //console.log(sql);
  connection.query(sql,(error,results,fields)=>{
    if(results==''){
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify({'msg':'error'}));
      res.end();
    }else{
      //console.log("no");
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify(results));
      res.end();
    }
  });
});

//搜索
app.get('/searchn',function(req,res){
  //获取url
  let url=req.url;
  //解析url
  let param=urlTool.parse(url,true);
  //console.log(param);
  //获取name
  let search=param.query.search;
  console.log(search);
  //准备下sql
  //查询username的用户地址
  let sql=`select * from shoplists where name like '%${search}%'`;
  //console.log(sql);
  connection.query(sql,(error,results,fields)=>{
    //console.log(results);
    if(results==''){
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify({'msg':'error'}));
      res.end();
    }else{
      //console.log("no");
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify(results));
      res.end();
    }
  });
});

//执行个人信息的添加
//表单的执行添加
app.post("/adduserinfo",(req,res)=>{
  //res.write("this is ");
  let from=new formidable.IncomingForm();
  //from.uploadDir="./uploads";
  //from.keepExtensions=true;
  from.parse(req,(err,fields,files)=>{
    //console.log(fields);
    //console.log(files);
    let username=fields.username;
    let headerpic=fields.headerpic;
    //let pic="http://localhost:8090/"+files.pic.path.slice(8);
    let phone=fields.phone;
    let email=fields.email;
    let hobby=fields.hobby;
    
    //console.log(username,headerpic,phone,email,hobby);
    connection.query(`insert into users_info(username,headerpic,phone,email,hobby) value('${username}','${headerpic}','${phone}','${email}','${hobby}')`,(error,results,fields)=>{
      //console.log(results);
      if(results.affectedRows>0){
        res.write(JSON.stringify({'msg':'ok'}));
        res.end();
      }else{
        res.write(JSON.stringify({'msg':'error'}));
        res.end();
      }
    });
  });
});

//查看个人信息
app.get('/indexuserinfo',function(req,res){
  //获取url
  let url=req.url;
  //解析url
  let param=urlTool.parse(url,true);
  //console.log(param);
  //获取name
  let username=param.query.username;
  //console.log(username);
  //准备下sql
  //查询username的用户个人信息
  let sql=`select * from users_info where username='${username}'`;
  //console.log(sql);
  connection.query(sql,(error,results,fields)=>{
    //console.log(results);
    if(results==''){
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify({'msg':'error'}));
      res.end();
    }else{
      //console.log("no");
      res.setHeader('content-type','text/html;charset=utf-8');
      res.write(JSON.stringify(results));
      res.end();
    }
  });
});


app.post("/edituserinfo",(req,res)=>{
  //console.log("小子");
  let form=new formidable.IncomingForm();
  //form.uploadDir="./uploads";
  //form.keepExtensions=true;
  form.parse(req,(err,fields,files)=>{
    let username=fields.username;
    let headerpic=fields.headerpic;
    //let pic="http://localhost:8090/"+files.pic.path.slice(8);
    let phone=fields.phone;
    let email=fields.email;
    let hobby=fields.hobby;
    //console.log(name,pic,content,fee,id);
    //准备下sql
    let sql="update users_info set username='"+username+"',headerpic='"+headerpic+"',phone='"+phone+"',email='"+email+"',hobby='"+hobby+"' where username='"+username+"'";
    //console.log(sql);
    connection.query(sql,(error,results,fields)=>{
      //console.log(results);
      if(results.affectedRows>0){
        res.write(stringify({'msg':'ok'}));
        res.end();
      }else{
        res.write(stringify({'msg':'error'}));
        res.end();
      }
     });
    
  });
});


app.listen('8090',function(){
  console.log("服务开启");
});