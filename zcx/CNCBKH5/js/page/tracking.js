
var orderId=GetQueryString('order_id');  

$.ajax({
	  type: "GET",
	  async:true,
	  url: baseUrl+"GoodOrder.aspx?op=showwuliu&order_id="+orderId,
	  dataType: "jsonp", //数据类型为jsonp  
	  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
	  jsonpCallback: "info",
	  success: function (data) {
		  $('.tracking-info .come').html(data.com);
		  $('.tracking-info .num').html(data.nu);

		  var result = '';
		  $.each(data["data"],function(i,info){
			  if(i==0){
			  	result += '<li class="cur">';
				result += '<i></i>';
				result += '<p>'+info.context+'</p>';
				result += '<p>'+info.time+'</p>';
				result += '</li>';
			  }else{
			  	result += '<li>';
				result += '<i></i>';
				result += '<p>'+info.context+'</p>';
				result += '<p>'+info.time+'</p>';
				result += '</li>';
			  }
			  
			  
		  });
		  $('.tracking-list').append(result);

	  }
});
