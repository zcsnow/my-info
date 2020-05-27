
var pageIndex = 1;//当前页码
var listNum = 10;// 每页展示10条
var pageTotalNum;// 总页数


var userId=GetQueryString('user_id');  
var typeNum = 1;
$.ajax({
	  type: "GET",
	  async:true,
	  url: baseUrl+"Member.aspx?op=memberreference&user_id="+userId+"&type=1"+ typeNum +"&pageindex="+ pageIndex +"&pagesize="+listNum,
	  dataType: "jsonp", //数据类型为jsonp  
	  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
	  jsonpCallback: "info",
	  success: function (data) {
		  var data = data.result;
		  var totalCount = data.count;
		  pageTotalNum = Math.ceil(totalCount/listNum);
		  if(data.list == "" || data.list == undefined || data.list == null){
			  var result = '';
			  result += '<div class="no-data">';
			  result += '<span>暂无数据</span>';
			  result += '</div>';
			  $('.recommend-list-box').append(result);
		  }else{
			  //列表下拉加载数据
			  $('.recommend-list-box').dropload({
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
		  url: baseUrl+"Member.aspx?op=memberreference&user_id="+userId+"&type="+ typeNum +"&pageindex="+ pageIndex +"&pagesize="+listNum,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result;
			  var result = '';
			  $.each(data["list"],function(i,info){
				  result += '<div class="list-con">';
				  if(!info.userImage==""){
				  result += '<div class="list-img"><img src='+info.userImage+'></div>';
				  }else{
				  result += '<div class="list-img"><img src=images/avatar.png></div>';
				  }
				  result += '<div class="list-info">';
				  result += '<p>会&ensp;员&ensp;名：'+info.username+'</p>';
				  result += '<p>会员级别：'+info.userlevel+'</p>';
				  result += '<p>推荐奖励：'+info.reward+'</p>';
				  result += '</div>';
				  result += '</div>';
			  });
			  // 为了测试，延迟0.3秒加载
			  setTimeout(function(){
				   $('.recommend-list').append(result);
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
	






	
