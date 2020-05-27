$(function(){
	
	
	//评论筛选tab
	$(".comment_tab").find("li").on("click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");	
	})
	
	//点击收藏
	$(".collection_btn").click(function(){
		if(!$(this).hasClass("cur")){
			$(this).addClass("cur");
			return jShare('收藏成功',"","");
		}else{
			$(this).removeClass("cur");
			return jShare('取消收藏',"","");
		}
		return false;
				
	});
	
	//点击添加到购物车
	$(".js-add_btn").click(function(){
		return jShare('恭喜您添加到购物车',"","");
		return false;
				
	});

	//添加商品数量点击
	$(".amount_add").click(function(){
		var amount_val = $(".amount_val").val();
		
		if($(".amount_val").val()<10){
			$(".amount_val").val(++amount_val);
			commodityNumber=$(".amount_val").val();
		}
		
	});

	//删除商品数量点击
	$(".amount_cut").click(function(){
		var amount_val = $(".amount_val").val();
		if(amount_val>1){
			$(".amount_val").val(--amount_val);
			commodityNumber=$(".amount_val").val();
		}
		
	});

	
	
});