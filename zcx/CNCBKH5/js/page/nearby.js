

var pageIndex = 1;//当前页码
var listNum = 10;// 每页展示10条
var pageTotalNum;// 总页数

$.ajax({
	  type: "GET",
	  async:true,
	  url: baseUrl+"Product.aspx?op=GetBusinessList&pageindex=1&pagesize="+listNum,
	  dataType: "jsonp", //数据类型为jsonp  
	  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
	  jsonpCallback: "info",
	  success: function (data) {
		  var data = data.result;
		  var totalCount = data.count;
		  pageTotalNum = Math.ceil(totalCount/listNum);
		  //列表下拉加载数据
		  $('.nearby-list-box').dropload({
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
		  url: baseUrl+"Product.aspx?op=GetBusinessList&pageindex="+ pageIndex +"&pagesize="+listNum,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result;
			  var result = '';
			  $.each(data["list"],function(i,info){
				  if(info.business_name.length>0){
				  result += '<li>';
				  result += '<a href="nearby_detail.html?bid='+info.bid+'">';
				  result += '<h3 class="maker"><span>'+info.business_name+'</span></h3>';
				  //result += '<h3 class="maker"><i>'+(i+1)+'</i><span>'+info.business_name+'</span></h3>';
				  result += '<p><strong>地址：</strong>'+info.address+'</p>';
				  result += '<p><strong>电话：</strong>'+info.phone+'</p>';
				  result += '<span class="clr"><em><i><img src="images/icon02.png" ></i>去这里</em><em><i><img src="images/icon01.png" ></i>查看详情</em></span>';
				  result += '</a>';
				  result += '</li>';
				  }
				  
			  });
			  // 为了测试，延迟0.3秒加载
			  setTimeout(function(){
				   $('.result-list').append(result);
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
	



 

	