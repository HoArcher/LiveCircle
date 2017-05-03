/**
 * New node file
 */
var mysql  = require('mysql'); 
var OptPool = require('./OptPool'); 
var optPool = new OptPool(); 
var pool = optPool.getPool(); 

 function poolSql(){
//执行SQL语句 
this.SqlQuery=function(sql,callback){    
    pool.getConnection(function(err,conn){    
        if(err){    
           // callback(err,null,null);
        	console.log(err+" poolSql-line-15");
        }else{    
        	console.log(sql+" poolSql-line-17");
            conn.query(sql,function(qerr,vals,fields){    
                //释放连接    
            	console.log(vals+" poolSql-line-18");
                conn.release();    
                //事件驱动回调    
               callback(vals);    
            });    
        }    
    });    
};    

/*
this.SqlQuery=function(sql){
	var result;
	var sel='select * from user where userphone like'+userphone;
	pool.getConnection(function(err,conn){ 
    conn.query(sel, function(err, rows) { 
        if (err) { 
            console.log('[query] - :'+err); 
            return; 
        }   
         var results =  JSON.stringify(rows[0]);
	    var row = results[0];
	    console.log(results);
	    
	    console.log("releasing");
        conn.release(); //放回连接池
        console.log("release ok");
        result=JSON.parse(results);
       console.log(result);
        
    });
});
	return result;
}*/
 }
module.exports =poolSql