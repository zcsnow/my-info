
var pageIndex = 1;//当前页码
var listNum = 10;// 每页展示10条
var pageTotalNum;// 总页数


var userId=GetQueryString('user_id');  
var typeNum = 1;
$.ajax({
	  type: "GET",
	  async:true,
	  url: baseUrl+"product.aspx?op=GetGoodFavoriteList&user_id="+userId +"&pageindex="+ pageIndex +"&pagesize="+listNum,
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
			  result += '<span>还没有收藏任何商品</span>';
			  result += '</div>';
			  $('.like-list-box').append(result);
		  }else{
			  //列表下拉加载数据
			  $('.like-list-box').dropload({
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
		  url: baseUrl+"product.aspx?op=GetGoodFavoriteList&user_id="+userId +"&pageindex="+ pageIndex +"&pagesize="+listNum,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result;
			  var result = '';
			  $.each(data["list"],function(i,info){
				  if(info.state){
					  result += '<a href="#" class="like-con clr">';
					  result += '<div class="like-img">';
					  
				  }else{
					  result += '<a href="#" class="like-con lose clr">';
					  result += '<div class="like-img">';
					  result += '<i class="status"><img src="images/lose_icon.png"></i>';
				  }
				  result += '<img src='+info.good_image+'>';
				  result += '</div>';
				  result += '<div class="like-text">';
				  result += '<p>'+info.good_name+info.properties+'</p>';
				  if(info.activity_price>0){
				  	  result += '<span><strong>¥ '+info.activity_price+'</strong><em>¥ '+info.price+'</em></span>';
				  }else{
					  result += '<span><strong>¥ '+info.price+'</strong></span>';
				  }
				  result += '<em class="add-btn js-prod-delete-btn"><img src="images/delete_icon.png">删除</em>';
				  result += '</div>';
				  result += '</a>';
				 
			  });
			  
			  // 为了测试，延迟0.3秒加载
			  setTimeout(function(){
				   $('.like-list').append(result);
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
	



$('.like-list').on('click','.js-prod-delete-btn',function(e){
	 e.preventDefault();
	 var $this = $(this);
	jShare("确定删除吗？","",function(result){
			if(result===true){
				$this.parents('.like-con').remove();
				if($('.like-list-box .like-con').length<=0){
					$('.dropload-noData').html('还没有收藏任何商品');
					
				}
			}
		});
  });


	
