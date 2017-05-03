/**
 * New node file
 */
var mysql = require('mysql');
function conSql(){
var connection = mysql.createConnection({
 host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'bookshop',
    charset : 'UTF8_GENERAL_CI',
    debug : false
});

connection.connect(function(err){  
    if(err){         
        console.log('[query] - :'+err);  
        return;  
    }  
    console.log('[connection connect]  succeed!');  
}); 
this.select=function(userphone){
	
	
	var sel='select * from user where userphone='+userphone;
	connection.query(sel, function(err, rows, fields) {
	    if (err) {
	       throw err;
	    }
	    
	    var results = rows[0];
	    var row = results[0];
	    console.log(results);
	    return results;
	});
	connection.end();
}


}
module.exports =conSql