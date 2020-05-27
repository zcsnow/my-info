
var pageIndex = 1;//当前页码
var listNum = 10;// 每页展示10条
var pageTotalNum;// 总页数

$.ajax({
	  type: "GET",
	  async:true,
	  url: baseUrl+"home.aspx?op=getnewslist&pageindex=1&pagesize="+listNum,
	  dataType: "jsonp", //数据类型为jsonp  
	  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
	  jsonpCallback: "info",
	  success: function (data) {
		  var data = data.result;
		  var totalCount = data.count;
		  pageTotalNum = Math.ceil(totalCount/listNum);
		  //列表下拉加载数据
		  $('.new-list-box').dropload({
			  scrollArea : window,
			  loadDownFn : function(me){
				  newsList(pageIndex,listNum,me);
				  if(pageIndex >= pageTotalNum){
					  // 锁定
					  me.lock();
					  // 无数据
					  me.noData();
					  return;
				  }
				  pageIndex++;
			  }
		  });
	  }
});
	

function newsList(pageIndex,listNum,me){
	var json_data = $.ajax({
		  type: "GET",
		  async: false,
		  url: baseUrl+"home.aspx?op=getnewslist&pageindex="+ pageIndex +"&pagesize="+listNum,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result;
			  var result = '';
			  $.each(data["list"],function(i,info){
				  result += '<div class="news-list clr">';
				  result += '<a href="news_content.html?id='+info.id+'">';
				  result += '<span class="img-box"><img src='+info.news_images + ' /></span>';
				  result += '<h3>'+info.news_title+'</h3>';
				  result += '<p class="item-desc">'+info.describe+'</p>';
				  result += '<time class="time">'+info.createtime+'</time>';
				  result += '</a>';
				  result += '</div>';
				  result += '<div class="line"></div>';
				  
			  });
			  // 为了测试，延迟0.3秒加载
			  setTimeout(function(){
				   $('.new-list-con').append(result);
				  // 每次数据加载完，必须重置
				  me.resetload();
			  },300);
		  },
		  error: function(xhr, type){
			  alert('Ajax error!');
			  // 即使加载出错，也得重置
			  me.resetload();
		  }
	  });
}
	






	
