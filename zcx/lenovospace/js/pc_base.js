;$(function(){

$(".ques-ewm").hover(function(){
    	$(".qr-popup").show();
		},function(){
		  $(".qr-popup").hide();
	});
	$(".ques-ewm1").hover(function(){
    	$(".qr-popup1").show();
		},function(){
		  $(".qr-popup1").hide();
	}); 
/*var curUrl = window.location.hash;
var urlArg=curUrl.substr(1); 
if(urlArg==1){
	$(".js-tab-menu li").eq(1).addClass("curr");
	$(".js-tab-menu li").eq(0).removeClass("curr");
	$(".js-tab-content .js-content-list").eq(1).show();
	$(".js-tab-content .js-content-list").eq(0).hide();
}
*/

  //tab切换
  $(".js-tab-menu").find("li").click(function(){
    var $this = $(this);
    var $thisIndex = $this.index();
    $(this).addClass("curr").siblings().removeClass("curr");
    $(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
  });
});