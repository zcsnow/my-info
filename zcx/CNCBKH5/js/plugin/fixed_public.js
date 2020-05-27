//在移动浏览器里
function topFixed(ele){
 if($(ele).length){//如果存在此元素时
	var scrolls = $(window).scrollTop();
	var menuHeight=0,top=0;
	var eleChild = $(ele).children().attr('id');
	
	if(ele==='.topFix'){//如果元素是头部导航
	  top=0;
	  menuHeight = $(ele).offset().top;
	}else{
		if($('.topFix').length){
		  //如果元素非头部导航
		  top= $('.topFix').height();
		  menuHeight = $(ele).offset().top-top;
		}else{
			menuHeight = $(ele).offset().top;
		}
	};
	if (scrolls > menuHeight) {
		$('#'+eleChild).css({position: "fixed",top:top,zIndex:"998"});
	}else {
		$('#'+eleChild).css({position: "relative",top:0,zIndex:"9"});
	};
 };
};


$(".add-btn").click(function(){
	var path = document.getElementById("ctx").value;
	var $this = $(this);
	var prodId=$(this).parent().find('.product').val();
	var count=$("#count").val();
	var count=$this.count;
	$.ajax({
	    url:path+'/cart/add',
	    data:{
	    	"prodId":prodId,"baseketCount":count
	    },
	    dataType:'json',
	    success:function(data){
	    	if(data.code==0){
	    		jShare('添加成功',"","");
	    	}else{
	    		jShare('添加失败',"","");
	    	}
	    },
	    error : function(){
			alert("请求数据失败！");
		}
	});
})
