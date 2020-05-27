$(document).ready(function(){
	
	//轮播图
	$(".banner_ctrl a").hover(function(){
		$(this).fadeTo(100,1);
		},function(){
		$(this).fadeTo(100,.6);
	});
			
	var tNum=$(".m_banner .banner").length-1;
	var nNum=0;		
	$(".banner_ctrl .prev").click(function(){
		(nNum-1)<0?n2=tNum:n2=nNum-1;
		bSwitch(nNum,n2);
		nNum=n2;
	});	
	$(".banner_ctrl .next").click(function(){
		(nNum+1)>tNum?n2=0:n2=nNum+1;
		bSwitch(nNum,n2);
		nNum=n2;
	});
	function bSwitch(nNum,n2){
		$(".m_banner .banner:eq("+nNum+")").fadeOut();
		$(".m_banner .banner:eq("+n2+")").fadeIn();
	};
							
	$(function(){
		var switchTime;
	 	$(".m_banner").hover(function(){
			clearInterval(switchTime);
		},function(){
		switchTime = setInterval(function(){
			(nNum+1)>tNum?n2=0:n2=nNum+1;
			bSwitch(nNum,n2);
			nNum=n2;
		},3000);
		}).trigger("mouseleave");
	});
	
	
	//tab切换
	$(".js-tab-menu").find("li").click(function(){
		var $this = $(this);
		var $thisIndex = $this.index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
	});
	
	
});


