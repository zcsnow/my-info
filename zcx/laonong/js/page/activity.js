;$(function(){
	//tab切换
	$(".js-tab-menu").find("li").click(function(){
		var $this = $(this);
		var $thisIndex = $this.index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
	})


});