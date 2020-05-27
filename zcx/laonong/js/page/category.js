$(function(){
	var scrollLeft,scrollMid,scrollRight;
	
	if($("#categoryLeft").length > 0){
		scrollLeft();
	}
	if($("#categoryMid").length > 0){
		scrollMid();
	}
	if($("#categoryRight").length > 0){
		scrollRight();
	}

	//tab切换事件
	var tabs = function(nav,content){
		$(nav).find("li").bind("click",function(e){
			e.preventDefault();
			var index = $(this).index();
			$(this).addClass("cur").siblings().removeClass("cur");
			$(content).eq(index).show().siblings(content).hide();
			scrollMid.refresh();
			scrollMid.scrollTo(0, 0, 200);
			//显示右边字母导航事件
			/*if(index == 0){
				$(".letter_box").show();
			}else{
				$(".letter_box").hide();
			}*/
			
		});
	}
	
	tabs(".category-menu", ".tabs_cell");
	
	function scrollLeft(){
	  scrollLeft = new iScroll('categoryLeft',{
				  hScrollbar:false,
				  vScrollbar:false,
				  hideScrollbar:true
			  });
	}
	
	
	function scrollMid(){
	  var pullUpEl = $('#pullUp');	
	  var pullUpOffset = pullUpEl.outerHeight();
	  scrollMid = new iScroll('categoryMid',{
				  hScrollbar:false,
				  vScrollbar:false,
				  hideScrollbar:true,
				  useTransition: true,
				  onRefresh: function () {
					  if (pullUpEl.hasClass('pull-loading')) {
						  pullUpEl.removeClass('pull-loading');;
						  //pullUpEl.find('.pullUpLabel').html('上拉加载更多...');
					  }
				  },
				  onScrollMove: function () {
					  if (this.y < (this.maxScrollY - 5) && !pullUpEl.hasClass('flip')) {
						  pullUpEl.attr('class','flip');
						  //pullUpEl.find('.pullUpLabel').html('松手开始更新...');
						  this.maxScrollY = this.maxScrollY;
					  } else if (this.y > (this.maxScrollY + 5) && pullUpEl.hasClass('flip')) {
						  pullUpEl.removeClass('flip');;
						  //pullUpEl.find('.pullUpLabel').html('上拉加载更多...');
						  this.maxScrollY = pullUpOffset;
					  }
				  },
				  onScrollEnd: function () {
					  if (pullUpEl.hasClass('flip')) {
						  pullUpEl.attr('class','pull-loading');
						  pullUpEl.find('.pullUpLabel').html('加载中...');				
						  pullUpAction();	// ajax调用
						 
					  }
				  }
				  
				  
			  });
	}
	
	/*function scrollRight(){
	  scrollRight = new iScroll('categoryRight',{
				  hScrollbar:false,
				  vScrollbar:false,
				  hideScrollbar:true
			  });
	}*/
	
	
	
	function pullUpAction () {
		setTimeout(function () {	// 模拟网络拥塞, 正是线上活动时删除setTimeout!
			var cur_tabs_cell = $('.tabs_cell').eq($('.category-menu li').index($('.cur')));  //获取右侧盒子为当前显示的.tabs_cell
			
			var product_list="";
			product_list+= '<a href="" class="prod-list clr">';
			product_list+= '<div class="prod-img">';
			product_list+= '<img src="images/listImg07.jpg">';
			product_list+= '</div>';
			product_list+= '<div class="prod-text">';
			product_list+= '<h3><strong>【老农部落】</strong>自营番茄</h3>';
			product_list+= '<p>每箱6个约500g</p>';
			product_list+= '<span><strong>¥ </strong>38</span>';
			product_list+= '<em class="add-btn js-add-cart-btn" data-id="" data-count="1"><img src="images/plus-icon.png"></em>';
			product_list+= '</div>';
			product_list+= '</a>';
			
			for (i=0; i<3; i++) {
				cur_tabs_cell.find(".prod-list-box").append(product_list);
			}
			
			scrollMid.refresh();		// 当内容加载完成之后(ajax completed)记得调用此方法刷新
		}, 1000);	// 模拟网络拥塞, 正是线上活动时删除setTimeout!
	}
	
	
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	
	//监听横竖屏切换事件
	window.addEventListener("orientationchange", function() {
		scrollMid.refresh();
	}, false);
	


	
});