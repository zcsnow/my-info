$(function () {

//截取字符串	
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var newsId=GetQueryString('id'); 
newsContent(newsId);

function newsContent(newsId){
	 $.ajax({
		  type: "GET",
		  async: false,
		  url: baseUrl+"home.aspx?op=getnewscontent&news_id="+newsId,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result;
			  var result = '';
			  result += '<h3 class="news-title">'+data.news_title+'</h3>';
			  result += '<div class="news-other"><span>编辑：'+data.author+'</span><span>时间：'+data.createtime+'</span></div>';
			  result += '<div class="line"></div>';
			  result += '<div class="news-con-box">'+data.news_content+'</div>';
			  $('.news-content').append(result);
		  }
	  });
}
	
});





	
