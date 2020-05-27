
var userId=GetQueryString('user_id');   

$.ajax({
	  type: "GET",
	  async:true,
	  url: baseUrl+"Member.aspx?op=memberMessage&type=2&user_id="+userId,
	  dataType: "jsonp", //数据类型为jsonp  
	  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
	  jsonpCallback: "info",
	  success: function (data) {
		  var data = data.result;
		  var result = '';
		  if(data == "" || data == undefined || data == null){
			  result += '<div class="no-data">';
			  result += '<div class="no-icon"><img src="images/msg_icon.png"/></div>';
			  result += '<span>您暂时没有消息</span>';
			  result += '</div>';
			  $('.msg-box').append(result);
		  }else{
			  $.each(data,function(i,info){
					result += '<p class="msg-time">'+info.message_time+'</p>';
					result += '<div class="msg-con">';
					result += '<h3><strong>'+info.message_title+'</strong></h3>';
					result += '<p class="msg-txt">'+info.message_content+'</p>';
					result += '</div>';
			  });
			  $('.msg-box').append(result);
		  }

	  }
});
