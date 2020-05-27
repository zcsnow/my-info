
//在移动浏览器里
function topFixed(ele){

 if($(ele).length){//如果存在此元素时
	var scrolls = $(window).scrollTop();
	var menuHeight,top=0;
	var eleChild = $(ele).children().attr('id');
	
	if(ele==='.header-box'){//如果元素是头部导航
		menuHeight = $(ele).offset().top;
	}else{
	  //如果元素非头部导航
		if($('.header-box').length){
			 top= $('.header-box').height();
		}
		menuHeight = $(ele).offset().top-top;
	};
	if (scrolls > menuHeight) {
		$('#'+eleChild).css({position: "fixed",top:top,zIndex:"998"});
	}else {
		$('#'+eleChild).css({position: "relative",top:0,zIndex:"11"});
	};
 };
};
