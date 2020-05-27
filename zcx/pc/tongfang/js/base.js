;$(function(){

//点击导航按钮
$('.js-bar-btn,.hand-btn').click(function(e){
	e.stopPropagation();
	if($('.js-bar-btn').hasClass('open')){
		$('.js-bar-btn').removeClass('open');
		$('.js-bar-list').addClass('slideOutRight').removeClass('slideInRight');
		$('html,body').css({overflowY:'auto',height:'auto'});
		
	}else{
		$('.js-bar-btn').addClass('open');
		$('.js-bar-list').addClass('slideInRight').removeClass('slideOutRight');
		$('html,body').css({overflow:'hidden',height:'100%'});
		$('.download-pop').hide();
	}
});

$(document).click(function(e){
	if($('.js-bar-btn').hasClass('open')){
		$('.js-bar-btn').removeClass('open');
		$('.js-bar-list').addClass('slideOutRight').removeClass('slideInRight');
		$('html,body').css({overflowY:'auto',height:'auto'});
	}
});




$('.js-bar-list').click(function(e){
	e.stopPropagation();
});


$('.list-level1').click(function(e){
	var subListLength = $(this).parent().find('.sub-list').length;
	if(subListLength){
		e.preventDefault();
		$(this).parent().find('.sub-list').slideToggle().parent().siblings().find('.sub-list').slideUp();
	}
	
});


//轮播图
if($('#homeSlider .swiper-slide').length>1){
var homeSwiper = new Swiper('#homeSlider',{
	loop:true,       //循环切换
	autoplay: 3000,  //自动播放
	autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
	pagination:'.swiper-pagination', //分页
	paginationClickable: true,
});
}


//tab切换
$(".js-tab-menu").find("li").click(function(){
	var $this = $(this);
	var $thisIndex = $this.index();
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
});



$('.js-download-btn').on('click',function(){
	var downUrl = $(this).parent().attr('data-url');
    $("#emailurl").val(downUrl);
	$('.download-pop').show();
});
$('.js-close-btn').on('click',function(){
	$('.download-pop').hide();
});
//内容提交
$(".btn-submit").click(function (e) {
	e.preventDefault();
	 
	    var urls=$("#emailurl").val();
        var username=$("#username").val();
        var email=$("#emial").val();
        $.ajax({url:"/Mobile/Message.ashx?name="+username+"&email="+email+"&url="+urls})
		alert('邮件发送成功'); 
        $('.download-pop').hide();
	 
});


});