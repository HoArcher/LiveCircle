/**
 * New node file
 */
mui.init()
getLocation(tianqi);
function tianqi(){
//		mui.ajax("http://apis.baidu.com/heweather/weather/free?city=beijing",{
//			dataType:'json',
//			crossDomain:true,
//		headers:{"apikey":"d91c7b1ed6466f69e1a5acbf2daa7f12"},
//			type:'get',
//			data:{},
//		success:function(data){
//		alert(data);
//	},
//	error:function(xhr,type,errorThrown){
//		//异常处理；
//		console.log(type);
//	}
//		
//	})


mui.ajax('http://apis.baidu.com/apistore/mobilephoneservice/mobilephone?tel=15846530170',{
	data:{
		
	},
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	headers:{'Content-Type':'application/json','apikey':'d91c7b1ed6466f69e1a5acbf2daa7f12'},	              
	success:function(data){
		//服务器返回响应，根据响应结果，分析是否登录成功；
		alert(data);
	},
	error:function(xhr,type,errorThrown){
		//异常处理；
		console.log(type);
	}
});
}
