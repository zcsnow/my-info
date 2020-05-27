;$(function(){
	
  //显示历史搜索
  $(".js-search-input").focus(function(){
	  $('.search-fast-box').show();
	  $('html,body').css({overflow:'hidden',height:'100%'});
  });
 
 $('.js-prod-delete-btn').click(function(e){
	 e.preventDefault();
	 var $this = $(this);
	jShare("确定删除吗？","",function(result){
			if(result===true){
				$this.parents('.prod-list').remove();
				if($('.prod-list-box .prod-list').length<=0){
					$('.no-content').removeClass('hidden');
					
				}
			}
		});
  });
  
  $('.js-brand-delete-btn').click(function(e){
	 e.preventDefault();
	 var $this = $(this);
	jShare("确定删除吗？","",function(result){
			if(result===true){
				$this.parents('.one-list').remove();
				if($('.brand-box .one-list').length<=0){
					$('.no-content').removeClass('hidden');
					
				}
			}
		});
  });
  


});