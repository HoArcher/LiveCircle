/**
 * mapjs
 * hehao
 */

var dqLongitude = "";//用于保存获取的用户当前经度
var dqLatitude = "";//用于保存获取的用户当前纬度
var dqCity="";//用户当前城市
var dqAddress ="";//用于保存用户当前的地址

function getLocation(callback){
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			 dqLongitude =r.point.lng;
			 dqLatitude = r.point.lat;
			 dqCity=r.address.city;
			 callback();
			onSuccess(r);
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
	
}
//行车记录
function longAndtime(spoi,point){  
    var output="";  
    var searchComplete = function (results){  
    if (transit.getStatus() != BMAP_STATUS_SUCCESS){ return ;}  
         var plan = results.getPlan(0);  
        output += plan.getDuration(true);                //获取时间  
        output += plan.getDistance(true);             //获取距离  
    }  
//var transit = new BMap.DrivingRoute(map, {renderOptions: {map: map,panel:"result"},  
////var transit = new BMap.DrivingRoute(map, {renderOptions: {map: map},  
//  // onSearchComplete: searchComplete,  
//  //  onPolylinesSet: function(){          
//  //     setTimeout(function(){alert(output)},"1000");}  
//        });  
transit.search(spoi, point);  
  }  
  
//成功时
function onSuccess(position){
    //经度
	  dqLongitude =position.point.lng;
    //纬度
	  dqLatitude = position.point.lat;
	  var dqPoint = new BMap.Point(dqLongitude,dqLatitude);
	    // 创建地理编码实例
	  var dqMyGeo = new BMap.Geocoder();
	    // 根据坐标得到地址描述
	  dqMyGeo.getLocation(dqPoint, function(result){
	    if (result){
	    	dqAddress = result.address;
	    	}
	    
	    });
}

