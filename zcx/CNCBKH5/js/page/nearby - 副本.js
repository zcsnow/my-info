// 百度地图API
  var map = new BMap.Map("allmap",{
      enableHighResolution: true //是否开启高清
  });
  //var mPoint = new BMap.Point(116.404, 39.915);  
  var mPoint = new BMap.Point(116.404, 39.915);
  map.enableInertialDragging(); //开启关系拖拽
  map.enableScrollWheelZoom();  //开启鼠标滚动缩放
  map.centerAndZoom(mPoint,15) ;
  var rPoint;
  
  var mapType1 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT});
  map.addControl(mapType1);          //右上角，默认地图控件
  map.setCurrentCity("北京");        //由于有3D图，需要设置城市哦


  // 添加带有定位的导航控件
  var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
  });
  map.addControl(navigationControl);
  // 添加定位控件
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    //alert("当前定位地址为：" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    //alert(e.message);
  });
  map.addControl(geolocationControl);
  
  
  var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			
			rPoint = new BMap.Point(+r.point.lng, r.point.lat);  
			var circle = new BMap.Circle(rPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    		map.addOverlay(circle);
			var myGeo = new BMap.Geocoder();
			var key = '美食';
			localSearch(key,rPoint);
			function localSearch(key,point){
				$("#hotmap-result").children().remove();
				var local = new BMap.LocalSearch("北京",{
					renderOptions:{map: map, autoViewport: true},
					onSearchComplete: function(results){
							if (local.getStatus() == BMAP_STATUS_SUCCESS){
								console.log(results.getPoi(1));
								var str = '<ul class="result">';
								for (var i = 0; i < results.getCurrentNumPois(); i ++){
									var alphabet = String.fromCharCode(64 + parseInt(i+1));
									var curPoint = results.getPoi(i).point;
									str += '<li data-pointX=' + curPoint.lng + ' data-pointY=' + curPoint.lat + '>';
									str += '<a href='+ results.getPoi(i).url+'>';
									str += '<h3 class="maker"><i>' + alphabet + '</i><span>' + results.getPoi(i).title + '</span></h3>';
									str += '<p><strong>地址：</strong>' + results.getPoi(i).address + '</p>';
									if(results.getPoi(i).phoneNumber!= undefined){
									str += '<p><strong>电话：</strong>' + results.getPoi(i).phoneNumber + '</p>';
									}
									str += '</a>'; 
									str += '</li>'; 
								}
								str += '</ul>';
								$("#hotmap-result").append(str);
							}
						},
				});
				//local.search(key);
				local.searchNearby(key,point,1000);
		  
			}
 
			//alert('您的位置：'+r.point.lng+','+r.point.lat);
		}
		else {
			//alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})

 

	