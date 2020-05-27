$(function(){
	var pageNum = 1;  //第几页
	var maxPageNum = 5;  //总共页数
	var pageSize = 5; //一页显示几条信息
	
	//评论筛选tab
	$(".comment_tab").find("li").on("click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");	
	})

	//滚动屏幕时，发请求获取更多的评论数据
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop(),
	　　     scrollHeight = $(document).height(),
	　　     windowHeight = $(window).height();
		//页面滚动到最底部，更多评论”的内容显示出来了
	　　if(scrollTop + windowHeight >= scrollHeight-50){
			ajaxLoad();
			
	　　}
	})
	  
	function ajaxLoad(){
		var comment_list="";  //发请求时添加到页面的内容
		//发请求start		
		var data={};
		data.pageNum = pageNum;
		data.pageSize = pageSize;
		
		$.ajax({  //请求数据整理
			type: "GET",
			url: "data/comment/comment_list.json",
			data: data,
			dataType: "json",
			success: function(data){
				
				$.each(data.Data, function(index, item){
					var userHead = item.userHead, //用户头像
						userName = item.userName, //用户名
						starLevel = item.starLevel, //星级
						dataTime = item.dataTime,   //日期
						userComment = item.userComment, //用户评价
						commentTag = item.commentTag;//用户评价标签
					
					/*拼出评价数据*/
					comment_list+= '<div class="content_comment">';
					comment_list+= '<div class="comment_user">';
					comment_list+= '<div class="user_cont">';
					comment_list+= '<a href="#">';
					comment_list+= '<img src="'+userHead+'" width="35px" height="35px" style="opacity: 1;">';
					comment_list+= '</a>';
					comment_list+= '<span class="user_name">'+userName+'</span>';
					comment_list+= '</div>';
					comment_list+= '<div class="user_class">';
					comment_list+= '<span class="comment_time">'+dataTime+'</span>';
					comment_list+= '</div>';
					comment_list+= '</div>';
					comment_list+= '<span class="starlevel_'+starLevel+'"></span>';
					comment_list+= '<div class="comment_cont">';
					comment_list+= '<p>'+userComment+'</p>';
					if(commentTag.length>0){ //判断用户是否评价标签了
						comment_list+= '<ul class="comment-tag-list">';
						for(i=0; i<commentTag.length; i++){
							comment_list+= '<li>'+commentTag[i].text+'</li>';
						}
						comment_list+= '</ul>';
					}
					comment_list+= '</div>';
					
					comment_list+= '</div>';
				});
				pageNum++;
				if(pageNum<=maxPageNum){
					$("#commentList").append(comment_list);
				}else{
					alert('最后一页了');
				}
				
			},
			error : function(){
				alert("请求数据失败！");
			}
		});
		//发请求end
	}
	
	



	
	
});