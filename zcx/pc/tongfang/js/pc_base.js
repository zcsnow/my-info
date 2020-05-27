;$(function(){
  

  //tab切换
  $(".js-tab-menu").find("li").click(function(){
    var $this = $(this);
    var $thisIndex = $this.index();
    $(this).addClass("curr").siblings().removeClass("curr");
    $(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
  });
  
  
  var i=0;
  $('.header').on('click','.js-search-btn',function(){
	  if(i==0){
		   $('.js-search-icon').fadeIn();
		   $('.search-input input').css({'width':'180px','margin-right':'10px','padding':'2px 10px','border-width':'1px'});
		   i=1;
	  }else {
		   
		   $('.search-input input').css({'width':'0','margin-right':'0','padding':'0','border-width':'0'});
		   $('.js-search-icon').hide();
		   i=0;
	  }
  	
  });
  
  //内容弹层
  $('.js-news-list').on('click',function(e){
	var contextHtml = "";
	//$('.news-pop-box').html(contextHtml);
  	$('.mask').show();
	$('.news-pop-box').show();
  });


// 关闭弹层
$('.news-pop-box .close-btn').on('click',function(e){
	e.stopPropagation();
	$('.mask').hide();
	$('.news-pop-box').hide();
	//$('.news-pop-box').html("");
});

$('.js-hexagon-list li').on('click',function(e){
	var title = $(this).find('a').html();
	$('.news-pop-box').find('.title').html(title);
  	$('.mask').show();
	$('.news-pop-box').show();
  });
  
  
  $('#waterfull').on('click','.item',function(e){
	var title = $(this).find('.li-title').html();
	$('.news-pop-box').find('.pop-title1').html(title);
  	$('.mask').show();
	$('.news-pop-box').show();
  });
  
  
  $('.js-team-list').on('click','li',function(e){
	var title = $(this).find('.li-title').html();
	$('.team-pop-box').find('.pop-title1').html(title);
  	$('.mask').show();
	$('.team-pop-box').show();
  });
  
  // 关闭弹层
$('.team-pop-box .close-btn').on('click',function(e){
	e.stopPropagation();
	$('.mask').hide();
	$('.team-pop-box').hide();
	//$('.news-pop-box').html("");
});

  

  
  
  
  
  
});
