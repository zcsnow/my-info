$(function () {
	

var activeId=GetQueryString('active_id')||0;  
activeContent(activeId);

function activeContent(activeId){
	 $.ajax({
		  type: "GET",
		  async: false,
		  url: baseUrl+"product.aspx?op=activitylist&active_id="+activeId,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result[0];
			  var html = '<a href='+ data.activity_url +'><img src='+data.activity_image +'></a>';

			  $('.active-content').html(html);
		  }
	  });
}
	
});





	
