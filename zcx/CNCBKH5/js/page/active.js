$(function () {
	
//活动接口
function activeContent(){
	 $.ajax({
		  type: "GET",
		  async: false,
		  url: baseUrl+"product.aspx?op=activitylist",
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
              var data = data.result;
			  var result = '';
			  $.each(data,function(i,info){
				  result += '<div class="list-img js-active" data-activityId='+info.activity_id+' data-atype='+info.atype+' data-goodId='+info.good_id+' data-skuId='+info.sku_id+'>';
				  result += '<img src="" data-src='+info.activity_image+' class="lazyload">';
				  result += '</div>';
			  });

			  $('.active-list-box').html(result);
		  }
	  });
}


activeContent();

$('.active-list-box').on('click','.js-active',function(e){
	 e.preventDefault();
	 var atype = $(this).attr('data-atype');     //活动类型 1 列表页面 2 产品详情页面
	 var good_id = $(this).attr('data-goodId');  // 产品ID
	 var sku_id = $(this).attr('data-skuId');    // sku_ID
	 var activityId = $(this).attr('data-activityId');
	 var activeInfo =
	  {
		  atype: atype,
		  good_id: good_id,
		  sku_id: sku_id,
		  activityId:activityId
	  };
	 //alert(atype,good_id,sku_id);
	 if(isAndroid){
		 //alert("Android");
		 test.active(atype,good_id,sku_id,activityId);
		
	 }else{
		//alert("ios");
		//console.log(activeInfo);
		window.webkit.messageHandlers.active.postMessage(activeInfo);
	 }
});




	
});





	
