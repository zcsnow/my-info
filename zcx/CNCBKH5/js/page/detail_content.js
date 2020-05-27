$(function () {
	
var goodId=GetQueryString('good_id');  
detailContent(goodId);

function detailContent(goodId){
	 $.ajax({
		  type: "GET",
		  async: false,
		  url: baseUrl+"product.aspx?op=GetGoodContent&good_id="+goodId,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result;
			  $('.detail-content').html(data);
		  }
	  });
}
	
});





	
