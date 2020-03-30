;$(function(){ 
  //tab切换
  $(".js-tab-menu").find(".tab-item").click(function(){
	  var $this = $(this);
	  var $thisIndex = $this.index();
	  $(this).addClass("on").siblings().removeClass("on");
	  $(".js-tab-content").find(".mod-list").eq($thisIndex).show().siblings().hide();
  });

});