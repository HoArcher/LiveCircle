/**
 * New node file
 */
var express = require('express');
var mysql=require('./poolSql');
var app = express();
var sql=new mysql();
/*
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1/8020');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);*/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//登录
app.get('/login', function(req, res){
	var query='select * from user where userphone like "'+req.query.phone+'"';
  var se=sql.SqlQuery(query,fuction(result){
  	if(vals.password==req.query.password){
  		 res.send({
  		 	static:'success',
  		 })
  	}else{
  		res.send({
  		 	static:'fail',
  		 })
  	}
  });

 // res.send(se);
});
//注册
app.post('/register', function(req, res){
	var query="insert into user(name,phoneNumber) values("+req.body.phoneNumber+","+req.body.phoneNumber+")";
  var se=sql.SqlQuery(query,function(val){
  	  res.send(val);
  }
 );

});
//修改
app.get('/modify', function(req, res){
	var query="UPDATE [user] SET [name = '"+req.body.name+"'] WHERE [phoneNumber='"+req.body.phoneNumber+"']";
  var se=sql.SqlQuery(query,send);
  console.log(se+"get-line-11");
 // res.send(se);
});
app.get('/delete', function(req, res){
	var query='select * from user where userphone like "'+req.query.phone+';"';
  var se=sql.SqlQuery(query,send);
  console.log(se+"get-line-11");
 // res.send(se);
});
console.log("Ok");
app.listen(3999);