;$(function(){
	
  //显示历史搜索
  $(".js-search-input").focus(function(){
	  $('.search-fast-box').show();
	  $('html,body').css({overflow:'hidden',height:'100%'});
  });
 
 $('.search-close-btn').click(function(e){
	 e.preventDefault();
	$('html,body').css({overflow:'auto',height:'auto'})
 	$('.search-fast-box').hide();
 });
  


});