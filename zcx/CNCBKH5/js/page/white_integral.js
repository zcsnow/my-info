
var pageIndex = 1;//当前页码
var listNum = 10;// 每页展示10条
var pageTotalNum;// 总页数
var userId=GetQueryString('user_id');  

$.ajax({
	  type: "GET",
	  async:true,
	  url: baseUrl+"Member.aspx?op=MemberGetWhite&user_id="+userId+"&pageindex="+ pageIndex +"&pagesize="+listNum,
	  dataType: "jsonp", //数据类型为jsonp  
	  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
	  jsonpCallback: "info",
	  success: function (data) {
		  var data = data.result;
		  var totalCount = data.count;
		  pageTotalNum = Math.ceil(totalCount/listNum);
		  $('.integral-num').html(data.white||0);

		  if(data.list == "" || data.list == undefined || data.list == null){
			  var result = '';
			  result += '<div class="no-data">';
			  result += '<span>暂无数据</span>';
			  result += '</div>';
			  $('.integral-list-box').append(result);
		  }else{
			  //列表下拉加载数据
			  $('.integral-list-box').dropload({
				  scrollArea : window,
				  loadDownFn : function(me){
					  integralList(pageIndex,listNum,me);
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
	  }
});
	

function integralList(pageIndex,listNum,me){
	var json_data = $.ajax({
		  type: "GET",
		  async: false,
		  url: baseUrl+"Member.aspx?op=MemberGetWhite&user_id="+userId+"&pageindex="+ pageIndex +"&pagesize="+listNum,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result;
			  var result = '';
			  $.each(data["list"],function(i,info){
				  result += '<li class="clr">';
				  result += '<span>'+info.datetime+'</span>';
				  result += '<span>'+info.integral+'</span>';
				  result += '<span>'+info.remarks+'</span>';
				  result += '</li>';
				  
			  });
			  // 为了测试，延迟0.3秒加载
			  setTimeout(function(){
				   $('.integral-list').append(result);
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
	
//赚积分
$('.js-app-integral-btn').on('click',function(){
	  if(isAndroid){
		   //alert("Android");
	  	   test.goIntegral();
	  }else{
		   //alert("ios");
		  window.webkit.messageHandlers.goIntegral.postMessage(null);
	  }
});


//帮助按钮
$('.js-white-help').on('click',function(e){
	  
	  if(isAndroid){
		   //alert("Android");
	  	   window.location.href="white_integral_help.html";
	  }else{
		  //alert("ios");
		  window.webkit.messageHandlers.whiteHelp.postMessage(null);
	  }
});


	
